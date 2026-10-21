package app

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/x/exp/teatest"
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

// waitFor consumes output until every s has appeared; output read here is gone for the next call.
func (e *env) waitFor(ss ...string) {
	e.t.Helper()
	teatest.WaitFor(e.t, e.tm.Output(), func(b []byte) bool {
		for _, s := range ss {
			if !bytes.Contains(b, []byte(s)) {
				return false
			}
		}
		return true
	}, teatest.WithDuration(30*time.Second))
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

func enterFirstQuestion(e *env, want ...string) {
	e.t.Helper()
	e.waitFor("選擇今天要測驗的語言")
	e.key(tea.KeyEnter)
	e.waitFor("1")
	e.key(tea.KeyEnter)
	e.waitFor(want...)
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
