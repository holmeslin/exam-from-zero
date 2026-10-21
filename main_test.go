package main

import (
	"io/fs"
	"os"
	"strings"
	"testing"
)

func verify(t *testing.T, bank fs.FS, args ...string) (string, error) {
	t.Helper()
	var out strings.Builder
	err := run(bank, append([]string{"verify"}, args...), &out)
	return out.String(), err
}

func TestVerify_EmbeddedBankPasses(t *testing.T) {
	bank, _ := fs.Sub(exams, "_exams")
	if out, err := verify(t, bank); err != nil {
		t.Fatalf("embedded bank failed verify: %v\n%s", err, out)
	}
}

func TestVerify_FixtureBanksPass(t *testing.T) {
	for _, dir := range []string{"bank", "stdout", "timeout", "quiz"} {
		t.Run(dir, func(t *testing.T) {
			if out, err := verify(t, os.DirFS("internal/app/testdata/"+dir)); err != nil {
				t.Fatalf("fixture bank failed verify: %v\n%s", err, out)
			}
		})
	}
}

func TestVerify_ReportsBrokenQuestions(t *testing.T) {
	out, err := verify(t, os.DirFS("testdata/badbank"), "go")
	if err == nil {
		t.Fatalf("verify passed a broken bank:\n%s", out)
	}
	for _, want := range []string{
		"bad-solution: solution 沒有通過",
		"bad-starter: starter 不應該通過",
		"bad-starter: id 重複",
		"no-prompt: 缺少 prompt",
		"no-prompt: difficulty 必須是 1-3",
		"bad-choice: answer 超出選項範圍",
		"bad-short: regex 無法編譯",
	} {
		if !strings.Contains(out, want) {
			t.Errorf("missing %q in output:\n%s", want, out)
		}
	}
}
