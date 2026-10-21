package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestSafeRead(t *testing.T) {
	base := t.TempDir()
	uploads := filepath.Join(base, "uploads")
	os.MkdirAll(filepath.Join(uploads, "img"), 0o755)
	os.WriteFile(filepath.Join(uploads, "cat.txt"), []byte("喵"), 0o644)
	os.WriteFile(filepath.Join(uploads, "img", "dog.txt"), []byte("汪"), 0o644)
	os.WriteFile(filepath.Join(base, "secret.txt"), []byte("機密"), 0o644)

	for name, want := range map[string]string{"cat.txt": "喵", "img/dog.txt": "汪", "img/../cat.txt": "喵"} {
		got, err := SafeRead(uploads, name)
		if err != nil || string(got) != want {
			t.Errorf("SafeRead(uploads, %q) = (%q, %v), want (%q, nil)", name, got, err, want)
		}
	}
	for _, name := range []string{"../secret.txt", "img/../../secret.txt", filepath.Join(base, "secret.txt")} {
		got, err := SafeRead(uploads, name)
		if err == nil {
			t.Errorf("SafeRead(uploads, %q) 讀到了 %q，應該回傳錯誤（路徑逃出了 uploads）", name, got)
		}
	}
}
