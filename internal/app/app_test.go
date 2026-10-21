package app

import (
	"bytes"
	"io"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"testing"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/x/exp/teatest"
	"go.yaml.in/yaml/v3"
)

type env struct {
	t   *testing.T
	tm  *teatest.TestModel
	cfg Config
}

func newConfig(t *testing.T) Config {
	t.Helper()
	return Config{
		Bank:      os.DirFS("testdata/bank"),
		ConfigDir: t.TempDir(),
		DataDir:   t.TempDir(),
		Seed:      1,
	}
}

func start(t *testing.T, cfg Config) *env {
	t.Helper()
	m, err := New(cfg)
	if err != nil {
		t.Fatal(err)
	}
	tm := teatest.NewTestModel(t, m, teatest.WithInitialTermSize(200, 50))
	t.Cleanup(func() { _ = tm.Quit() })
	return &env{t: t, tm: tm, cfg: cfg}
}

// waitFor consumes output until every s has appeared and returns what it read; that output is gone for the next call.
func (e *env) waitFor(ss ...string) string {
	e.t.Helper()
	var seen []byte
	teatest.WaitFor(e.t, e.tm.Output(), func(b []byte) bool {
		seen = b
		for _, s := range ss {
			if !bytes.Contains(b, []byte(s)) {
				return false
			}
		}
		return true
	}, teatest.WithDuration(30*time.Second))
	return string(seen)
}

func (e *env) key(k tea.KeyType) { e.tm.Send(tea.KeyMsg{Type: k}) }
func (e *env) press(r string)    { e.tm.Send(tea.KeyMsg{Type: tea.KeyRunes, Runes: []rune(r)}) }

func (e *env) writeAnswer(lang, id, file, src string) {
	e.t.Helper()
	p := filepath.Join(e.cfg.DataDir, "workspace", lang, id, file)
	if err := os.WriteFile(p, []byte(src), 0o644); err != nil {
		e.t.Fatal(err)
	}
}

const addRight = "package main\n\nfunc Add(a, b int) int { return a + b }\n\nfunc main() {}\n"

func TestGoCodeQuestion_PassAndFail(t *testing.T) {
	e := start(t, newConfig(t))
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter) // Go
	e.waitFor("基礎")
	e.key(tea.KeyEnter) // chapter 1
	e.waitFor("實作 Add", "go-ch01-q01")

	e.key(tea.KeyEnter) // grade untouched starter
	e.waitFor("測試失敗")

	e.writeAnswer("go", "go-ch01-q01", "main.go", addRight)
	e.key(tea.KeyEnter)
	e.waitFor("通過")

	// hidden test must not be left behind in the workspace
	if _, err := os.Stat(filepath.Join(e.cfg.DataDir, "workspace", "go", "go-ch01-q01", "main_test.go")); !os.IsNotExist(err) {
		t.Fatalf("hidden test left in workspace: %v", err)
	}
}

func enterFirstQuestion(e *env, want ...string) string {
	e.t.Helper()
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter)
	e.waitFor("1")
	e.key(tea.KeyEnter)
	return e.waitFor(want...)
}

func TestStdoutQuestion_MismatchThenPass(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/stdout")
	e := start(t, cfg)
	enterFirstQuestion(e, "印出 hello")
	e.key(tea.KeyEnter)
	e.waitFor("執行中")
	e.waitFor("✗ 輸出不符", "預期", "hello", "實際", "bye")
	e.writeAnswer("go", "go-stdout", "main.go", "package main\n\nimport \"fmt\"\n\nfunc main() { fmt.Println(\"hello\") }\n")
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
}

func TestCompileError(t *testing.T) {
	e := start(t, newConfig(t))
	enterFirstQuestion(e, "實作 Add")
	e.writeAnswer("go", "go-ch01-q01", "main.go", "package main\n\nfunc Add(a, b int) int { return a + }\n")
	e.key(tea.KeyEnter)
	e.waitFor("✗ 編譯錯誤", "syntax error")
}

func TestInfiniteLoopTimesOut(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/timeout")
	e := start(t, cfg)
	enterFirstQuestion(e, "印出 done")
	e.key(tea.KeyEnter)
	e.waitFor("⏱ 逾時")
}

func goFunc(name, op string) string {
	return "package main\n\nfunc " + name + "(a, b int) int { return a " + op + " b }\n\nfunc main() {}\n"
}

func (e *env) workspaceFile(lang, id, file string) string {
	e.t.Helper()
	b, err := os.ReadFile(filepath.Join(e.cfg.DataDir, "workspace", lang, id, file))
	if err != nil {
		e.t.Fatal(err)
	}
	return string(b)
}

func TestChallenge_WrongAnswerIsRedoneThenChapterUnlocks(t *testing.T) {
	e := start(t, newConfig(t))
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter)
	e.waitFor("0/2 過關", "基礎", "🔒")
	e.key(tea.KeyDown) // chapter 2 is locked: cursor must stay on chapter 1
	e.key(tea.KeyEnter)
	e.waitFor("實作 Add", "第 1/2 題", "★☆☆")

	e.key(tea.KeyEnter) // starter fails -> marked wrong
	e.waitFor("測試失敗")
	e.writeAnswer("go", "go-ch01-q01", "main.go", goFunc("Add", "+"))
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter) // next
	e.waitFor("實作 Sub", "第 2/2 題", "★★☆", "✗ ●")

	e.writeAnswer("go", "go-ch01-q02", "main.go", goFunc("Sub", "-"))
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter)
	e.waitFor("曾答錯", "workspace 已重設")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Add", "重做 1/1")
	if got := e.workspaceFile("go", "go-ch01-q01", "main.go"); !strings.Contains(got, "return 0") {
		t.Fatalf("redo workspace not reset to starter:\n%s", got)
	}
	e.writeAnswer("go", "go-ch01-q01", "main.go", goFunc("Add", "+"))
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter)
	e.waitFor("過關", "曾錯 1", "已解鎖", "函式")

	e.key(tea.KeyEsc) // back to chapter list
	e.waitFor("1/2 過關", "✓")
	e.key(tea.KeyDown)
	e.key(tea.KeyEnter)
	e.waitFor("第 1/1 題") // chapter 2 samples 1 of 2
}

func TestChallenge_LeavingNeedsConfirmAndResumes(t *testing.T) {
	e := start(t, newConfig(t))
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter)
	e.waitFor("基礎")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Add")
	e.writeAnswer("go", "go-ch01-q01", "main.go", goFunc("Add", "+"))
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Sub")

	e.key(tea.KeyEsc)
	e.waitFor("確定離開")
	e.press("n")
	e.waitFor("enter 判定") // only changed lines are repainted, so wait on the help line
	e.key(tea.KeyEsc)
	e.waitFor("確定離開")
	e.press("y")
	e.waitFor("進行中 1/2")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Sub", "第 2/2 題")
}

func TestChoiceAndShortQuestions(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/quiz")
	e := start(t, cfg)
	screen := enterFirstQuestion(e, "哪個 receiver 能修改原本的 struct", "兩者皆可") // inline markdown is rendered, not shown raw
	if !strings.Contains(screen, "type T struct { N int `json:\"n\"` }") {
		t.Errorf("an indented code line must keep its backticks:\n%s", screen)
	}

	right := slices.Index(choiceOrder(screen, quizChoices...), "func (r *T) M()")
	wrong := (right + 1) % len(quizChoices)
	for range wrong {
		e.key(tea.KeyDown)
	}
	e.key(tea.KeyEnter)
	e.waitFor("✗ 答錯")
	for range wrong {
		e.key(tea.KeyUp)
	}
	for range right {
		e.key(tea.KeyDown)
	}
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.press("r")
	e.waitFor("正確答案：func (r *T) M()")
	e.key(tea.KeyEnter)
	e.waitFor("指標型別怎麼寫", "答案：")

	e.tm.Type("T")
	e.key(tea.KeyEnter)
	e.waitFor("✗ 答錯")
	e.key(tea.KeyBackspace)
	e.tm.Type("  Pointer   to T ") // normalized: trimmed, lower-cased, spaces collapsed
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
}

var quizChoices = []string{"func (r T) M()", "func (r *T) M()", "兩者皆可"}

// choiceOrder returns choices in the order the screen lists them.
func choiceOrder(screen string, choices ...string) []string {
	order := slices.Clone(choices)
	slices.SortFunc(order, func(a, b string) int { return strings.Index(screen, a) - strings.Index(screen, b) })
	return order
}

func TestChoices_AreShuffled(t *testing.T) {
	for seed := range uint64(8) {
		cfg := newConfig(t)
		cfg.Bank, cfg.Seed = os.DirFS("testdata/quiz"), seed
		e := start(t, cfg)
		screen := enterFirstQuestion(e, "兩者皆可")
		if !slices.Equal(choiceOrder(screen, quizChoices...), quizChoices) {
			return
		}
	}
	t.Fatal("choices were listed in bank order for every seed")
}

func TestProgress_ResumesAfterRestart(t *testing.T) {
	cfg := newConfig(t)
	e := start(t, cfg)
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter)
	e.waitFor("基礎")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Add")
	e.writeAnswer("go", "go-ch01-q01", "main.go", goFunc("Add", "+"))
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Sub")
	if err := e.tm.Quit(); err != nil {
		t.Fatal(err)
	}

	cfg.Seed = 99 // a resumed run must not be resampled
	e = start(t, cfg)
	e.waitFor("0/2", "▸ 第 1 關進行中 (1/2)")
	e.key(tea.KeyEnter)
	e.waitFor("進行中 1/2")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Sub", "第 2/2 題")

	raw, err := os.ReadFile(filepath.Join(cfg.ConfigDir, "progress.json"))
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{`"go-ch01-q01"`, `"status": "correct"`, `"attempts": 1`} {
		if !strings.Contains(string(raw), want) {
			t.Errorf("progress.json missing %s:\n%s", want, raw)
		}
	}
}

func TestProgress_CorruptFileIsReportedNotOverwritten(t *testing.T) {
	cfg := newConfig(t)
	p := filepath.Join(cfg.ConfigDir, "progress.json")
	if err := os.WriteFile(p, []byte("{not json"), 0o644); err != nil {
		t.Fatal(err)
	}
	_, err := New(cfg)
	if err == nil || !strings.Contains(err.Error(), "progress.json") {
		t.Fatalf("want error naming progress.json, got %v", err)
	}
	if raw, _ := os.ReadFile(p); string(raw) != "{not json" {
		t.Fatalf("corrupt progress file was overwritten: %q", raw)
	}
}

func TestHintsAndReferenceAnswer(t *testing.T) {
	cfg := newConfig(t)
	e := start(t, cfg)
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter)
	e.waitFor("基礎")
	e.key(tea.KeyEnter)
	e.waitFor("實作 Add", "h 提示")

	e.press("h")
	e.waitFor("💡 提示 1/2", "用 + 運算子", "📖 chapter1/05_func.md")
	e.press("h")
	e.waitFor("💡 提示 2/2", "return a + b")

	e.press("r") // no reference answer before passing
	e.writeAnswer("go", "go-ch01-q01", "main.go", goFunc("Add", "+"))
	e.key(tea.KeyEnter)
	if out := e.waitFor("✓ 通過"); strings.Contains(out, "── main.go ──") {
		t.Fatal("reference answer shown before passing")
	}
	e.press("r")
	e.waitFor("參考答案", "── main.go ──")

	e.key(tea.KeyEnter)
	e.waitFor("實作 Sub")
	e.writeAnswer("go", "go-ch01-q02", "main.go", goFunc("Sub", "-"))
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter)
	e.waitFor("過關", "看過提示 1")

	raw, _ := os.ReadFile(filepath.Join(cfg.ConfigDir, "progress.json"))
	if !strings.Contains(string(raw), `"hinted": true`) {
		t.Fatalf("hint not recorded:\n%s", raw)
	}
}

func TestFlag_ReplacesQuestionAndExcludesItLater(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/flag")
	e := start(t, cfg)
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter)
	e.waitFor("檢舉")
	e.key(tea.KeyEnter)
	out := e.waitFor("題目")
	first, other, firstID := "題目甲", "題目乙", "flag-a"
	if !strings.Contains(out, first) {
		first, other, firstID = other, first, "flag-b"
	}

	e.press("!")
	e.waitFor("確定檢舉")
	e.press("y")
	e.waitFor(other) // "第 1/1 題" is unchanged so not repainted
	raw, err := os.ReadFile(filepath.Join(cfg.ConfigDir, "flagged.json"))
	if err != nil || !strings.Contains(string(raw), firstID) {
		t.Fatalf("flagged.json missing %s: %v\n%s", firstID, err, raw)
	}

	e.key(tea.KeyEnter) // answer "對"
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter)
	e.waitFor("過關")
	e.key(tea.KeyEsc)
	e.waitFor("✓")
	e.key(tea.KeyEnter) // replay: only the unflagged question is left
	e.waitFor(other)

	e.press("!") // flagging the last one leaves nothing to replace it, which must not block passing
	e.waitFor("確定檢舉")
	e.press("y")
	e.waitFor("過關")

	e.key(tea.KeyEsc) // every question is flagged now: re-entering must not crash
	e.waitFor("檢舉")
	e.key(tea.KeyEnter)
	e.waitFor("答對 0/0")
}

func TestReset_OnlyAfterAllPassedAndArchivesWorkspace(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/reset")
	// rust progress must survive a go reset
	if err := os.WriteFile(filepath.Join(cfg.ConfigDir, "progress.json"), []byte(`{"rust":{"passed":["01-one"]}}`), 0o644); err != nil {
		t.Fatal(err)
	}
	ws := filepath.Join(cfg.DataDir, "workspace", "go")
	if err := os.MkdirAll(ws, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(ws, "mine.go"), []byte("first round"), 0o644); err != nil {
		t.Fatal(err)
	}

	e := start(t, cfg)
	e.waitFor("選擇今天要測驗的語言")
	e.press("R") // go not passed yet: nothing happens
	e.key(tea.KeyDown)
	if out := e.waitFor("▶ Rust"); strings.Contains(out, "以確認") {
		t.Fatal("reset offered before every chapter passed")
	}
	e.key(tea.KeyUp)
	e.key(tea.KeyEnter)
	e.waitFor("唯一一關")
	e.key(tea.KeyEnter)
	e.waitFor("選第一個")
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	e.key(tea.KeyEnter)
	e.waitFor("過關")
	e.key(tea.KeyEsc)
	e.waitFor("✓")
	e.key(tea.KeyEsc)
	e.waitFor("✓ 全部過關")

	e.press("R")
	e.waitFor("重置 Go", "go.bak-", "輸入 go 以確認")
	e.tm.Type("gx")
	e.key(tea.KeyEnter)
	e.waitFor("名稱不符")
	e.tm.Type("go")
	e.key(tea.KeyEnter)
	e.waitFor("0/1")

	if _, err := os.Stat(ws); !os.IsNotExist(err) {
		t.Fatalf("workspace not moved away: %v", err)
	}
	baks, _ := filepath.Glob(ws + ".bak-*")
	if len(baks) != 1 {
		t.Fatalf("want one archived workspace, got %v", baks)
	}
	if raw, _ := os.ReadFile(filepath.Join(baks[0], "mine.go")); string(raw) != "first round" {
		t.Fatalf("archive lost the learner's code: %q", raw)
	}
	raw, _ := os.ReadFile(filepath.Join(cfg.ConfigDir, "progress.json"))
	if !strings.Contains(string(raw), `"rust"`) || strings.Contains(string(raw), `"go"`) {
		t.Fatalf("reset must clear only go:\n%s", raw)
	}
}

func TestEditorKeyOpensStarterFileInEditor(t *testing.T) {
	// fake editor: writes a correct answer into the file it is given
	script := filepath.Join(t.TempDir(), "fake-editor")
	src := "#!/bin/sh\nprintf 'package main\\n\\nfunc Add(a, b int) int { return a + b }\\n\\nfunc main() {}\\n' > \"$1\"\n"
	if err := os.WriteFile(script, []byte(src), 0o755); err != nil {
		t.Fatal(err)
	}
	t.Setenv("VISUAL", "")
	t.Setenv("EDITOR", script)

	e := start(t, newConfig(t))
	enterFirstQuestion(e, "實作 Add", "e 開編輯器")
	e.press("e")
	e.waitFor("實作 Add") // TUI comes back after the editor exits
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
}

func TestMissingToolchainIsGreyedAndSkipped(t *testing.T) {
	bin := t.TempDir() // PATH with a fake go but no cargo
	if err := os.WriteFile(filepath.Join(bin, "go"), []byte("#!/bin/sh\n"), 0o755); err != nil {
		t.Fatal(err)
	}
	t.Setenv("PATH", bin)
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/reset")
	e := start(t, cfg)
	e.waitFor("Rust", "✗ 缺少 cargo")
	e.key(tea.KeyDown) // must not land on Rust
	e.key(tea.KeyEnter)
	e.waitFor("Go   0/1 過關")
}

func TestNodeLang_InstallsOnFirstEntryThenGrades(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/node")
	e := start(t, cfg)
	e.waitFor("TypeScript", "⚙ 首次進入將安裝依賴")
	e.key(tea.KeyEnter)
	e.waitFor("安裝 TypeScript 依賴中")
	e.waitFor("第一步") // chapter list after npm install
	e.key(tea.KeyEnter)
	e.waitFor("實作 add")
	e.writeAnswer("typescript", "ts-add", "add.ts", "export function add(a: number, b: number): number { return a + b }\n")
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
}

func TestNodeLang_ReinstallsWhenBankWorkspaceChanges(t *testing.T) {
	bank := t.TempDir() // typescript only, so the ⚙ marker can only be its own
	if err := os.CopyFS(filepath.Join(bank, "typescript"), os.DirFS("testdata/node/typescript")); err != nil {
		t.Fatal(err)
	}
	cfg := newConfig(t)
	cfg.Bank = os.DirFS(bank)
	e := start(t, cfg)
	e.waitFor("TypeScript", "⚙ 首次進入將安裝依賴")
	e.key(tea.KeyEnter)
	e.waitFor("安裝 TypeScript 依賴中")
	e.waitFor("第一步") // chapter list after npm install
	if err := e.tm.Quit(); err != nil {
		t.Fatal(err)
	}

	e = start(t, cfg) // same bank: no reinstall
	if screen := e.waitFor("TypeScript", "選擇今天要測驗的語言"); strings.Contains(screen, "⚙") {
		t.Fatalf("an unchanged workspace asked to reinstall:\n%s", screen)
	}
	if err := e.tm.Quit(); err != nil {
		t.Fatal(err)
	}

	// a new release of the bank adds a dependency
	pkg := filepath.Join(bank, "typescript", "_workspace", "package.json")
	raw, err := os.ReadFile(pkg)
	if err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(pkg, bytes.Replace(raw, []byte(`"private": true,`), []byte(`"private": true, "description": "v2",`), 1), 0o644); err != nil {
		t.Fatal(err)
	}
	e = start(t, cfg)
	e.waitFor("TypeScript", "⚙ 首次進入將安裝依賴")
	e.key(tea.KeyEnter)
	e.waitFor("安裝 TypeScript 依賴中")
}

func TestWorkspace_ArchivedWhenBankStarterChanges(t *testing.T) {
	bank := t.TempDir()
	if err := os.CopyFS(bank, os.DirFS("testdata/bank")); err != nil {
		t.Fatal(err)
	}
	cfg := newConfig(t)
	cfg.Bank = os.DirFS(bank)
	restart := func(e *env) *env {
		if err := e.tm.Quit(); err != nil {
			t.Fatal(err)
		}
		return start(t, cfg)
	}
	e := start(t, cfg)
	enterFirstQuestion(e, "實作 Add")
	e.writeAnswer("go", "go-ch01-q01", "main.go", "// my work\n")

	e = restart(e) // same bank: the learner's work stays
	enterFirstQuestion(e, "實作 Add", "// my work")

	// a new release of the bank changes this question's starter
	starter := filepath.Join(bank, "go", "go-ch01-q01", "starter", "main.go")
	if err := os.WriteFile(starter, []byte("package main\n\n// v2 starter\nfunc Add(a, b int) int { return 0 }\n\nfunc main() {}\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	e = restart(e)
	enterFirstQuestion(e, "實作 Add", "// v2 starter") // the inline editor shows the new starter
	old, err := filepath.Glob(filepath.Join(cfg.DataDir, "workspace", "go", "go-ch01-q01.bak-*", "main.go"))
	if err != nil || len(old) != 1 {
		t.Fatalf("want the old workspace archived once, got %v %v", old, err)
	}
	if b, _ := os.ReadFile(old[0]); string(b) != "// my work\n" {
		t.Fatalf("archive lost the learner's work: %q", b)
	}
}

func TestRun_ResampledWhenBankChapterChanges(t *testing.T) {
	bank := t.TempDir()
	if err := os.CopyFS(bank, os.DirFS("testdata/bank")); err != nil {
		t.Fatal(err)
	}
	cfg := newConfig(t)
	cfg.Bank = os.DirFS(bank)
	e := start(t, cfg)
	enterFirstQuestion(e, "第 1/2 題")
	if err := e.tm.Quit(); err != nil {
		t.Fatal(err)
	}

	e = start(t, cfg) // same bank: the saved run resumes
	enterFirstQuestion(e, "第 1/2 題")
	if err := e.tm.Quit(); err != nil {
		t.Fatal(err)
	}

	// a new release of the bank changes the chapter; the old run's questions no longer mean the same thing
	ch := filepath.Join(bank, "go", "01-basics.yaml")
	raw, err := os.ReadFile(ch)
	if err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(ch, bytes.Replace(raw, []byte("sample: 2"), []byte("sample: 1"), 1), 0o644); err != nil {
		t.Fatal(err)
	}
	e = start(t, cfg)
	enterFirstQuestion(e, "第 1/1 題")
}

func TestInlineEditor_MissingMainFileShowsError(t *testing.T) {
	cfg := newConfig(t)
	e := start(t, cfg)
	enterFirstQuestion(e, "實作 Add")
	if err := e.tm.Quit(); err != nil {
		t.Fatal(err)
	}
	if err := os.Remove(filepath.Join(cfg.DataDir, "workspace", "go", "go-ch01-q01", "main.go")); err != nil {
		t.Fatal(err)
	}
	e = start(t, cfg)
	enterFirstQuestion(e, "實作 Add", "錯誤：", "main.go")
}

func TestNodeLang_FailedInstallCanBeRetried(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/badnode")
	e := start(t, cfg)
	e.waitFor("TypeScript")
	e.key(tea.KeyEnter)
	e.waitFor("✗ 安裝失敗", "enter 重試")
	e.key(tea.KeyEnter)
	e.waitFor("安裝 TypeScript 依賴中")
	e.waitFor("✗ 安裝失敗")
	e.key(tea.KeyEsc)
	e.waitFor("選擇今天要測驗的語言")
}

func TestKeysThatLeaveTheQuestionAreIgnoredWhileGrading(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/timeout") // grading takes the full timeout
	e := start(t, cfg)
	enterFirstQuestion(e, "印出 done")
	e.key(tea.KeyEnter)
	e.waitFor("執行中")
	e.key(tea.KeyEsc) // leaving mid-grade would let the result land on another question
	e.press("y")
	e.press("!")
	e.press("y")
	e.waitFor("⏱ 逾時")
}

func TestGradingNeverTouchesLearnerFiles(t *testing.T) {
	e := start(t, newConfig(t))
	enterFirstQuestion(e, "實作 Add")
	mine := "package main\n\n// my own notes, same name as the hidden test\n"
	e.writeAnswer("go", "go-ch01-q01", "main_test.go", mine)
	e.writeAnswer("go", "go-ch01-q01", "main.go", addRight)
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
	if got := e.workspaceFile("go", "go-ch01-q01", "main_test.go"); got != mine {
		t.Fatalf("learner file changed by grading:\n%s", got)
	}
}

func TestEditorOpensSourceFileNotManifest(t *testing.T) {
	dir := t.TempDir()
	log := filepath.Join(dir, "opened")
	script := filepath.Join(dir, "fake-editor")
	if err := os.WriteFile(script, []byte("#!/bin/sh\necho \"$1\" > "+log+"\n"), 0o755); err != nil {
		t.Fatal(err)
	}
	t.Setenv("VISUAL", "")
	t.Setenv("EDITOR", script)

	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/rust")
	e := start(t, cfg)
	enterFirstQuestion(e, "實作 add")
	e.press("e")
	e.waitFor("實作 add")
	raw, err := os.ReadFile(log)
	if err != nil {
		t.Fatal(err)
	}
	if got := strings.TrimSpace(string(raw)); !strings.HasSuffix(got, filepath.Join("src", "lib.rs")) {
		t.Fatalf("editor opened %s, want src/lib.rs", got)
	}
}

func TestInlineEditor_EditSaveAndGrade(t *testing.T) {
	e := start(t, newConfig(t))
	enterFirstQuestion(e, "實作 Add", "return 0", "tab 編輯")
	e.key(tea.KeyTab)
	e.waitFor("✎ 編輯中", "ctrl+s 存檔並判定")
	e.key(tea.KeyCtrlHome)
	for range 3 {
		e.key(tea.KeyDown)
	}
	e.key(tea.KeyCtrlE) // end of "\treturn 0"
	e.key(tea.KeyBackspace)
	e.tm.Type("a + b")
	e.key(tea.KeyCtrlS)
	e.waitFor("✓ 通過")
	if got := e.workspaceFile("go", "go-ch01-q01", "main.go"); !strings.Contains(got, "return a + b") {
		t.Fatalf("inline edit not saved:\n%s", got)
	}
}

func TestInlineEditor_DoesNotClobberEditsMadeElsewhere(t *testing.T) {
	e := start(t, newConfig(t))
	enterFirstQuestion(e, "實作 Add", "return 0")
	e.writeAnswer("go", "go-ch01-q01", "main.go", addRight) // edited in the learner's IDE
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過", "return a + b") // the editor pane reloads what was graded
	if got := e.workspaceFile("go", "go-ch01-q01", "main.go"); got != addRight {
		t.Fatalf("IDE edit overwritten:\n%s", got)
	}
}

func TestRunDrop_InRedoRemovesFromIDsAndQueuesReplacement(t *testing.T) {
	diff := func(string) int { return 1 }
	r := &Run{IDs: []string{"a", "b"}, Wrong: []string{"a"}, Redo: true}
	if _, done := r.Drop("c", diff); done || r.Current() != "c" || !slices.Equal(r.IDs, []string{"c", "b"}) {
		t.Fatalf("replacement must be answered before the run ends: %+v", r)
	}
	r = &Run{IDs: []string{"a", "b"}, Wrong: []string{"a"}, Redo: true}
	if _, done := r.Drop("", diff); !done || !slices.Equal(r.IDs, []string{"b"}) {
		t.Fatalf("dropped question must leave IDs: %+v", r)
	}
}

func TestExecIn_CapsOutputOfPrintLoop(t *testing.T) {
	res, _, err := execIn(t.Context(), t.TempDir(), time.Second, nil, []string{"yes"})
	if err != nil || res.Kind != KindTimeout || len(res.Output) > maxOutput+100 {
		t.Fatalf("kind %v, %d bytes, err %v", res.Kind, len(res.Output), err)
	}
}

func TestVerify_RejectsUnknownLang(t *testing.T) {
	if err := Verify(t.Context(), os.DirFS("testdata/bank"), "typescrit", io.Discard); err == nil {
		t.Fatal("a typo must not verify successfully")
	}
}

func TestQuestion_MissingOrNullAnswerFailsCheck(t *testing.T) {
	for _, src := range []string{"choices: [a, b]", "choices: [a, b]\nanswer: ~", "choices: [a, b]\nanswer: 0"} {
		var q Question
		if err := yaml.Unmarshal([]byte("type: choice\n"+src), &q); err != nil {
			t.Fatal(err)
		}
		bad := slices.Contains(checkStructure(&q), "answer 超出選項範圍")
		if want := !strings.HasSuffix(src, "answer: 0"); bad != want {
			t.Errorf("%q: range error %v, want %v (answer %d)", src, bad, want, q.Answer)
		}
	}
}

func TestArchiveDir_ReturnsErrorWhenWorkspaceUnreadable(t *testing.T) {
	m := &model{cfg: Config{DataDir: t.TempDir()}}
	ws := filepath.Join(m.cfg.DataDir, "workspace")
	if err := os.Mkdir(ws, 0); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = os.Chmod(ws, 0o755) })
	if _, err := m.archiveDir("go"); err == nil { // used to loop forever and freeze the menu
		t.Fatal("want permission error")
	}
}
