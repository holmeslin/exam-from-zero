package app

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"slices"
)

// Verify checks bank structure and that every code question's solution passes and starter fails.
// only limits it to one lang; "" means all.
func Verify(ctx context.Context, fsys fs.FS, only string, w io.Writer) error {
	b, err := LoadBank(fsys)
	if err != nil {
		return err
	}
	// a typo would otherwise skip every lang and still report success
	if only != "" && (len(b.Chapters[only]) == 0 || !slices.ContainsFunc(langs, func(l Lang) bool { return l.ID == only })) {
		return fmt.Errorf("題庫沒有支援的語言 %q", only)
	}
	tmp, err := os.MkdirTemp("", "exam-verify-")
	if err != nil {
		return err
	}
	defer os.RemoveAll(tmp)

	problems := 0
	report := func(id, format string, a ...any) {
		problems++
		fmt.Fprintf(w, "✗ %s: %s\n", id, fmt.Sprintf(format, a...))
	}
	seen := map[string]bool{}
	for _, l := range langs {
		if only != "" && l.ID != only {
			continue
		}
		if len(b.Chapters[l.ID]) == 0 {
			continue
		}
		if _, err := exec.LookPath(l.Tool); err != nil {
			report(l.ID, "缺少 %s，無法驗證", l.Tool)
			continue
		}
		if runners[l.ID].setup != nil {
			if out, err := setupLang(ctx, b, l.ID, filepath.Join(tmp, l.ID), nil); err != nil {
				report(l.ID, "安裝依賴失敗：%v\n%s", err, out)
				continue
			}
		}
		for _, c := range b.Chapters[l.ID] {
			key := l.ID + "/" + c.Key
			if c.Sample < 1 || len(c.Questions) < c.Sample {
				report(key, "題庫 %d 題少於 sample %d", len(c.Questions), c.Sample)
			}
			if c.Title == "" {
				report(key, "缺少 title")
			}
			if c.Source.SHA == "" || c.Source.SHA == "TODO" { // the SHA is what tells us which chapters to regenerate later
				report(key, "source.sha 不可為空或 TODO")
			}
			for i := range c.Questions {
				q := &c.Questions[i]
				if seen[q.ID] {
					report(q.ID, "id 重複")
					continue
				}
				seen[q.ID] = true
				for _, p := range checkStructure(q) {
					report(q.ID, "%s", p)
				}
				if q.Type == "code" {
					for _, p := range checkCode(ctx, b, l.ID, q, tmp) {
						report(q.ID, "%s", p)
					}
				}
			}
		}
	}
	if problems > 0 {
		return fmt.Errorf("%d 個問題", problems)
	}
	fmt.Fprintln(w, "✓ 題庫驗證通過")
	return nil
}

func checkStructure(q *Question) []string {
	var p []string
	if q.ID == "" {
		p = append(p, "缺少 id")
	}
	if q.Prompt == "" {
		p = append(p, "缺少 prompt")
	}
	if q.Difficulty < 1 || q.Difficulty > 3 {
		p = append(p, "difficulty 必須是 1-3")
	}
	if len(q.Hints) != 2 {
		p = append(p, "hints 必須剛好兩層")
	}
	if q.Ref == "" {
		p = append(p, "缺少 ref")
	}
	switch q.Type {
	case "code":
		if q.Check != "test" && q.Check != "stdout" {
			p = append(p, "check 必須是 test 或 stdout")
		}
	case "choice":
		if len(q.Choices) < 2 {
			p = append(p, "choices 至少要兩個")
		}
		if q.Answer < 0 || q.Answer >= len(q.Choices) {
			p = append(p, "answer 超出選項範圍")
		}
	case "short":
		if len(q.Answers) == 0 {
			p = append(p, "缺少 answers")
		}
		for _, re := range q.Answers {
			if _, err := regexp.Compile(re); err != nil {
				p = append(p, fmt.Sprintf("regex 無法編譯：%s", re))
			}
		}
	default:
		p = append(p, "type 必須是 code、choice 或 short")
	}
	return p
}

func checkCode(ctx context.Context, b *Bank, lang string, q *Question, tmp string) []string {
	var p []string
	for _, part := range []string{"solution", "starter"} {
		dir := filepath.Join(tmp, lang, q.ID+"-"+part)
		if err := materialize(b, lang, q, part, dir); err != nil {
			return append(p, fmt.Sprintf("%s：%v", part, err))
		}
		res, err := gradeCode(ctx, b, lang, q, dir)
		switch {
		case err != nil:
			p = append(p, fmt.Sprintf("%s 判定錯誤：%v", part, err))
		case part == "solution" && !res.Pass():
			p = append(p, fmt.Sprintf("solution 沒有通過（%s）\n%s", res.Kind, res.Output))
		case part == "starter" && res.Pass():
			p = append(p, "starter 不應該通過")
		}
	}
	return p
}
