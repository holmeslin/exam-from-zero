package main

import (
	"os"
	"path/filepath"
	"slices"
	"testing"
)

func TestGoFiles(t *testing.T) {
	root := t.TempDir()
	for _, name := range []string{
		"main.go",
		"README.md",
		"util/strings.go",
		"util/notes.txt",
		"util/deep/x.go",
		".git/hook.go",
		"vendor/lib/lib.go",
		"cmd/vendor.go",
	} {
		path := filepath.Join(root, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(path, []byte("package x\n"), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	want := []string{
		filepath.FromSlash("cmd/vendor.go"),
		"main.go",
		filepath.FromSlash("util/deep/x.go"),
		filepath.FromSlash("util/strings.go"),
	}
	got, err := GoFiles(root)
	if err != nil {
		t.Fatalf("GoFiles 回傳錯誤：%v", err)
	}
	if !slices.Equal(got, want) {
		t.Errorf("GoFiles = %q\nwant %q\n（.git 和 vendor 資料夾要整個跳過；路徑要相對於 root）", got, want)
	}
}

func TestGoFilesMissingRoot(t *testing.T) {
	if _, err := GoFiles(filepath.Join(t.TempDir(), "沒有這個資料夾")); err == nil {
		t.Errorf("root 不存在時 GoFiles 應該回傳錯誤，卻得到 nil")
	}
}
