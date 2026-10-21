package main

import (
	"maps"
	"testing"
	"testing/fstest"
)

func TestCountByExt(t *testing.T) {
	fsys := fstest.MapFS{
		"README.md":         {Data: []byte("說明")},
		"Makefile":          {Data: []byte("all:")},
		"src/main.go":       {Data: []byte("package main")},
		"src/util/math.go":  {Data: []byte("package util")},
		"src/util/v1.0.txt": {Data: []byte("note")},
		"docs/a.md":         {Data: []byte("# A")},
	}
	got, err := CountByExt(fsys)
	if err != nil {
		t.Fatalf("CountByExt 回傳錯誤: %v", err)
	}
	want := map[string]int{".md": 2, ".go": 2, ".txt": 1, "": 1}
	if !maps.Equal(got, want) {
		t.Errorf("CountByExt = %v, want %v", got, want)
	}
}
