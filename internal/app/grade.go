package app

import (
	"bytes"
	"context"
	"errors"
	"io"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
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
	scaffold         map[string]string // extra files written next to the starter
}

var runners = map[string]runner{
	"go": {
		build:    []string{"go", "build", "./..."},
		test:     []string{"go", "test", "./..."},
		run:      []string{"go", "run", "."},
		timeout:  10 * time.Second,
		scaffold: map[string]string{"go.mod": "module q\n\ngo 1.25\n"},
	},
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

// gradeCode grades the code in dir; for check=test the hidden tests are overlaid only for the run.
func gradeCode(ctx context.Context, b *Bank, lang string, q *Question, dir string) (Result, error) {
	r := runners[lang]
	if r.build != nil {
		res, _, err := execIn(ctx, dir, r.timeout, r.build)
		if res.Kind != KindPass || err != nil {
			if res.Kind == KindTest {
				res.Kind = KindCompile
			}
			return res, err
		}
	}
	if q.Check == "stdout" {
		res, stdout, err := execIn(ctx, dir, r.timeout, r.run)
		if err != nil || res.Kind != KindPass {
			return res, err
		}
		if stdout != q.ExpectedStdout {
			return Result{Kind: KindStdout, Output: stdout, Expected: q.ExpectedStdout}, nil
		}
		return res, nil
	}
	files, err := copyTree(b.FS, b.questionDir(lang, q.ID, "test"), dir)
	defer func() {
		for _, f := range files {
			os.Remove(f)
		}
	}()
	if err != nil {
		return Result{}, err
	}
	res, _, err := execIn(ctx, dir, r.timeout, r.test)
	return res, err
}

// execIn runs argv in dir and returns combined output plus stdout alone; a non-zero exit is a KindTest result, not an error.
func execIn(ctx context.Context, dir string, timeout time.Duration, argv []string) (Result, string, error) {
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	cmd := exec.CommandContext(ctx, argv[0], argv[1:]...)
	cmd.Dir = dir
	var out, stdout bytes.Buffer
	cmd.Stdout, cmd.Stderr = io.MultiWriter(&out, &stdout), &out
	// kill the whole group: `go test` / `cargo run` spawn the real binary as a child
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	cmd.Cancel = func() error { return syscall.Kill(-cmd.Process.Pid, syscall.SIGKILL) }
	cmd.WaitDelay = time.Second
	err := cmd.Run()
	if ctx.Err() == context.DeadlineExceeded {
		return Result{Kind: KindTimeout, Output: out.String()}, "", nil
	}
	var exit *exec.ExitError
	if errors.As(err, &exit) {
		return Result{Kind: KindTest, Output: out.String()}, "", nil
	}
	if err != nil {
		return Result{}, "", err
	}
	return Result{Kind: KindPass, Output: out.String()}, stdout.String(), nil
}
