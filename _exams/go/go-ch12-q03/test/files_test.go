package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestReadOrDefault(t *testing.T) {
	dir := t.TempDir()
	got, err := ReadOrDefault(filepath.Join(dir, "nothing.txt"), "預設")
	if err != nil || got != "預設" {
		t.Errorf("檔案不存在時 ReadOrDefault = (%q, %v), want (%q, nil)", got, err, "預設")
	}
	p := filepath.Join(dir, "a.txt")
	os.WriteFile(p, []byte("內容"), 0o644)
	got, err = ReadOrDefault(p, "預設")
	if err != nil || got != "內容" {
		t.Errorf("檔案存在時 ReadOrDefault = (%q, %v), want (%q, nil)", got, err, "內容")
	}
	if _, err := ReadOrDefault(dir, "預設"); err == nil {
		t.Errorf("讀取目錄應該回傳錯誤，got nil")
	}
}

func TestAppendLine(t *testing.T) {
	p := filepath.Join(t.TempDir(), "log.txt")
	for _, line := range []string{"第一行", "第二行", "第三行"} {
		if err := AppendLine(p, line); err != nil {
			t.Fatalf("AppendLine(%q) 回傳錯誤: %v", line, err)
		}
	}
	data, err := os.ReadFile(p)
	if err != nil {
		t.Fatalf("讀不到 %s: %v", p, err)
	}
	if got, want := string(data), "第一行\n第二行\n第三行\n"; got != want {
		t.Errorf("檔案內容 = %q, want %q", got, want)
	}
}
