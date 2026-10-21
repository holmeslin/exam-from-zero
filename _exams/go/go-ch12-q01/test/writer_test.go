package main

import (
	"fmt"
	"io"
	"strings"
	"testing"
)

func TestCountingWriter(t *testing.T) {
	var sb strings.Builder
	cw := &countingWriter{w: &sb}
	fmt.Fprintln(cw, "hello")
	if _, err := io.Copy(cw, strings.NewReader("你好\n")); err != nil {
		t.Fatalf("io.Copy 回傳錯誤: %v", err)
	}
	if got, want := sb.String(), "hello\n你好\n"; got != want {
		t.Errorf("底層 Writer 收到 %q, want %q", got, want)
	}
	if got, want := cw.n, 13; got != want {
		t.Errorf("cw.n = %d, want %d（中文每字 3 個 byte）", got, want)
	}
}
