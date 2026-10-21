package main

import (
	"bytes"
	"errors"
	"strings"
	"testing"
)

const findTestInput = "Go is fun\nI like go\nrust\nGOPHER\n"

func runFind(args []string, stdin string) (code int, stdout, stderr string) {
	var out, errOut bytes.Buffer
	code = run(args, strings.NewReader(stdin), &out, &errOut)
	return code, out.String(), errOut.String()
}

func TestRunMatches(t *testing.T) {
	cases := []struct {
		args []string
		want string
	}{
		{[]string{"go"}, "I like go\n"},
		{[]string{"-i", "go"}, "Go is fun\nI like go\nGOPHER\n"},
		{[]string{"-n", "-i", "GO"}, "1:Go is fun\n2:I like go\n4:GOPHER\n"},
		{[]string{"java"}, ""},
	}
	for _, c := range cases {
		code, out, errOut := runFind(c.args, findTestInput)
		if code != 0 {
			t.Errorf("run(%q) 結束碼 = %d，want 0（stderr：%q）", c.args, code, errOut)
		}
		if out != c.want {
			t.Errorf("run(%q) stdout = %q，want %q", c.args, out, c.want)
		}
		if errOut != "" {
			t.Errorf("run(%q) 成功時 stderr 應該是空的，卻是 %q", c.args, errOut)
		}
	}
}

func TestRunUsageErrors(t *testing.T) {
	for _, args := range [][]string{
		{},                // 沒給字詞
		{"a", "b"},        // 給太多
		{"-x", "go"},      // 沒有這個選項
		{"go", "-i", "x"}, // 選項要寫在前面，這裡變成 3 個位置參數
	} {
		code, out, errOut := runFind(args, findTestInput)
		if code != 2 {
			t.Errorf("run(%q) 結束碼 = %d，want 2（用法錯誤）", args, code)
		}
		if out != "" {
			t.Errorf("run(%q) 用法錯誤時 stdout 應該是空的，卻是 %q", args, out)
		}
		if errOut == "" {
			t.Errorf("run(%q) 用法錯誤時應該在 stderr 印出說明", args)
		}
	}
}

func TestRunHelp(t *testing.T) {
	code, out, errOut := runFind([]string{"-h"}, findTestInput)
	if code != 0 {
		t.Errorf("run([\"-h\"]) 結束碼 = %d，want 0", code)
	}
	if out != "" || errOut == "" {
		t.Errorf("run([\"-h\"]) 說明應該寫到 stderr：stdout = %q，stderr = %q", out, errOut)
	}
}

type failingReader struct{}

func (failingReader) Read([]byte) (int, error) { return 0, errors.New("磁碟壞了") }

func TestRunReadError(t *testing.T) {
	var out, errOut bytes.Buffer
	if code := run([]string{"go"}, failingReader{}, &out, &errOut); code != 1 {
		t.Errorf("讀取失敗時結束碼 = %d，want 1", code)
	}
	if errOut.Len() == 0 {
		t.Errorf("讀取失敗時應該在 stderr 印出錯誤")
	}
}
