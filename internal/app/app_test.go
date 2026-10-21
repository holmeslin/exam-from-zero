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

func TestChoiceAndShortQuestions(t *testing.T) {
	cfg := newConfig(t)
	cfg.Bank = os.DirFS("testdata/quiz")
	e := start(t, cfg)
	enterFirstQuestion(e, "哪個 receiver", "func (r *T) M()")

	e.key(tea.KeyEnter) // first option is wrong
	e.waitFor("✗ 答錯")
	e.key(tea.KeyDown)
	e.key(tea.KeyEnter)
	e.waitFor("✓ 通過")
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
}
