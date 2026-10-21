package app

import (
	"bytes"
	"cmp"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
	"sync"
	"syscall"
	"time"
)

// Result kinds.
const (
	KindPass    = "pass"
	KindTest    = "test"    // hidden test failed
	KindCompile = "compile" // build failed
	KindStdout  = "stdout"  // output mismatch
	KindTimeout = "timeout"
	KindWrong   = "wrong" // choice/short mismatch
)

type Result struct {
	Kind     string
	Output   string
	Expected string // stdout questions only
}

func (r Result) Pass() bool { return r.Kind == KindPass }

// runner describes how one lang builds, tests and runs a question workspace.
type runner struct {
	build, test, run []string
	timeout          time.Duration
	scaffold         map[string]string         // extra files written next to the starter
	env              func(dir string) []string // extra environment for every command
	// inRoot runs commands from the lang root (the question dir's parent), with {dir} in argv replaced by the question dir name
	inRoot bool
	// setup runs once in the lang root after <lang>/_workspace from the bank is copied there
	setup []string
}

func nodeRunner() runner {
	return runner{
		test: []string{"npx", "--no-install", "vitest", "run", "--dir", "{dir}"},
		// type stripping is on by default only from Node 22.18, but vitest accepts 22.12
		run:     []string{"node", "--experimental-strip-types", "{dir}/main.ts"},
		timeout: 10 * time.Second, // a warm vitest+jsdom run measured under 1s
		inRoot:  true,
		setup:   []string{"npm", "install", "--no-audit", "--no-fund"},
	}
}

var runners = map[string]runner{
	"go": {
		build:    []string{"go", "build", "./..."},
		test:     []string{"go", "test", "./..."},
		run:      []string{"go", "run", "."},
		timeout:  10 * time.Second,
		scaffold: map[string]string{"go.mod": "module q\n\ngo 1.25\n"},
	},
	"rust": {
		build:   []string{"cargo", "build", "-q"},
		test:    []string{"cargo", "test", "-q"},
		run:     []string{"cargo", "run", "-q"},
		timeout: 120 * time.Second, // first build also downloads and compiles dependencies
		// every question is its own package; a shared target dir lets them reuse compiled deps
		env: func(dir string) []string {
			return []string{"CARGO_TARGET_DIR=" + filepath.Join(filepath.Dir(dir), ".target")}
		},
	},
	"typescript": nodeRunner(),
	"vue":        nodeRunner(),
	"react":      nodeRunner(),
}

const setupTimeout = 10 * time.Minute

// langReady reports whether the lang root has finished setup for the bank's current shared workspace files.
func langReady(b *Bank, lang, root string) bool {
	if runners[lang].setup == nil {
		return true
	}
	stamp, err := os.ReadFile(filepath.Join(root, ".ready"))
	return err == nil && string(stamp) == workspaceStamp(b, lang)
}

// workspaceStamp hashes <lang>/_workspace so a bank release that changes dependencies triggers a reinstall.
func workspaceStamp(b *Bank, lang string) string {
	h := sha256.New()
	_ = fs.WalkDir(b.FS, path.Join(lang, "_workspace"), func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		data, err := fs.ReadFile(b.FS, p)
		fmt.Fprintf(h, "%s\x00%d\x00", p, len(data))
		h.Write(data)
		return err
	})
	return hex.EncodeToString(h.Sum(nil))
}

// setupLang copies the bank's shared workspace files into root and installs dependencies; the output explains a failure.
func setupLang(ctx context.Context, b *Bank, lang, root string) (string, error) {
	if _, err := copyTree(b.FS, path.Join(lang, "_workspace"), root); err != nil {
		return "", err
	}
	res, _, err := execIn(ctx, root, setupTimeout, nil, runners[lang].setup)
	if err != nil || !res.Pass() {
		return res.Output, cmp.Or(err, fmt.Errorf("%s 失敗", strings.Join(runners[lang].setup, " ")))
	}
	return "", os.WriteFile(filepath.Join(root, ".ready"), []byte(workspaceStamp(b, lang)), 0o644)
}

// Workspace is where a learner edits one question.
func workspaceDir(dataDir, lang, id string) string {
	return filepath.Join(dataDir, "workspace", lang, id)
}

// prepareWorkspace copies the starter in unless the learner already has work there.
func prepareWorkspace(b *Bank, dataDir, lang string, q *Question) (string, error) {
	dir := workspaceDir(dataDir, lang, q.ID)
	if _, err := os.Stat(dir); err == nil {
		return dir, nil
	}
	return dir, resetWorkspace(b, dataDir, lang, q)
}

func resetWorkspace(b *Bank, dataDir, lang string, q *Question) error {
	return materialize(b, lang, q, "starter", workspaceDir(dataDir, lang, q.ID))
}

// materialize writes one part (starter or solution) of q into dir, replacing whatever was there.
func materialize(b *Bank, lang string, q *Question, part, dir string) error {
	if err := os.RemoveAll(dir); err != nil {
		return err
	}
	if _, err := copyTree(b.FS, b.questionDir(lang, q.ID, part), dir); err != nil {
		return err
	}
	for name, body := range runners[lang].scaffold {
		if err := os.WriteFile(filepath.Join(dir, name), []byte(body), 0o644); err != nil {
			return err
		}
	}
	return nil
}

// copyTree copies src (in fsys) into dst and returns the files it wrote.
func copyTree(fsys fs.FS, src, dst string) ([]string, error) {
	var written []string
	err := fs.WalkDir(fsys, src, func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		rel, _ := filepath.Rel(src, p)
		out := filepath.Join(dst, rel)
		if d.IsDir() {
			return os.MkdirAll(out, 0o755)
		}
		data, err := fs.ReadFile(fsys, p)
		if err != nil {
			return err
		}
		written = append(written, out)
		return os.WriteFile(out, data, 0o644)
	})
	return written, err
}

// gradeCode grades the code in dir. It works on a throwaway sibling copy with the hidden tests overlaid,
// so the learner's files are never overwritten and the hidden tests never appear in their workspace.
func gradeCode(ctx context.Context, b *Bank, lang string, q *Question, dir string) (Result, error) {
	work := filepath.Join(filepath.Dir(dir), "_grade-"+filepath.Base(dir))
	if err := os.RemoveAll(work); err != nil {
		return Result{}, err
	}
	defer os.RemoveAll(work)
	if _, err := copyTree(os.DirFS(dir), ".", work); err != nil {
		return Result{}, err
	}
	if q.Check != "stdout" {
		if _, err := copyTree(b.FS, b.questionDir(lang, q.ID, "test"), work); err != nil {
			return Result{}, err
		}
	}

	r, cwd := runners[lang], work
	var env []string
	if r.env != nil {
		env = r.env(work)
	}
	if r.inRoot {
		r.build, r.test, r.run = inDir(r.build, work), inDir(r.test, work), inDir(r.run, work)
		cwd = filepath.Dir(work)
	}
	if r.build != nil {
		res, _, err := execIn(ctx, cwd, r.timeout, env, r.build)
		if res.Kind != KindPass || err != nil {
			if res.Kind == KindTest {
				res.Kind = KindCompile
			}
			return res, err
		}
	}
	if q.Check == "stdout" {
		res, stdout, err := execIn(ctx, cwd, r.timeout, env, r.run, q.Stdin)
		if err != nil || res.Kind != KindPass {
			return res, err
		}
		if stdout != q.ExpectedStdout {
			return Result{Kind: KindStdout, Output: stdout, Expected: q.ExpectedStdout}, nil
		}
		return res, nil
	}
	res, _, err := execIn(ctx, cwd, r.timeout, env, r.test)
	return res, err
}

// inDir substitutes the question dir name into argv.
func inDir(argv []string, dir string) []string {
	if argv == nil {
		return nil
	}
	out := slices.Clone(argv)
	for i, a := range out {
		out[i] = strings.ReplaceAll(a, "{dir}", filepath.Base(dir))
	}
	return out
}

// execIn runs argv in dir and returns combined output plus stdout alone; a non-zero exit is a KindTest result, not an error.
func execIn(ctx context.Context, dir string, timeout time.Duration, env, argv []string, stdin ...string) (Result, string, error) {
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	cmd := exec.CommandContext(ctx, argv[0], argv[1:]...)
	cmd.Dir = dir
	if env != nil {
		cmd.Env = append(os.Environ(), env...)
	}
	if len(stdin) > 0 {
		cmd.Stdin = strings.NewReader(stdin[0])
	}
	var out, stdout capBuf
	cmd.Stdout, cmd.Stderr = io.MultiWriter(&out, &stdout), &out
	// kill the whole group: `go test` / `cargo run` spawn the real binary as a child
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	cmd.Cancel = func() error { return syscall.Kill(-cmd.Process.Pid, syscall.SIGKILL) }
	cmd.WaitDelay = time.Second
	err := cmd.Run()
	output := out.buf.String()
	if out.over {
		output += "\n…（輸出超過 1 MiB，已截斷）"
	}
	if ctx.Err() == context.DeadlineExceeded {
		return Result{Kind: KindTimeout, Output: output}, "", nil
	}
	var exit *exec.ExitError
	if errors.As(err, &exit) || out.over { // truncated output must never count as a pass
		return Result{Kind: KindTest, Output: output}, "", nil
	}
	if err != nil {
		return Result{}, "", err
	}
	return Result{Kind: KindPass, Output: output}, stdout.buf.String(), nil
}

const maxOutput = 1 << 20

// capBuf keeps the first maxOutput bytes and drains the rest, so a print loop cannot exhaust memory.
// It locks because exec copies stdout and stderr from separate goroutines.
type capBuf struct {
	mu   sync.Mutex
	buf  bytes.Buffer
	over bool
}

func (c *capBuf) Write(p []byte) (int, error) {
	c.mu.Lock()
	defer c.mu.Unlock()
	room := maxOutput - c.buf.Len()
	c.buf.Write(p[:min(len(p), room)])
	c.over = c.over || len(p) > room
	return len(p), nil
}

// gradeAnswer grades choice (by index) and short (by normalized text against regexes) questions.
func gradeAnswer(q *Question, choice int, text string) Result {
	ok := false
	switch q.Type {
	case "choice":
		ok = choice == q.Answer
	case "short":
		norm := strings.ToLower(strings.Join(strings.Fields(text), " "))
		ok = slices.ContainsFunc(q.Answers, func(re string) bool {
			m, err := regexp.MatchString("(?i)"+re, norm) // input is lower-cased, so patterns must ignore case too
			return err == nil && m
		})
	}
	if ok {
		return Result{Kind: KindPass}
	}
	return Result{Kind: KindWrong}
}
