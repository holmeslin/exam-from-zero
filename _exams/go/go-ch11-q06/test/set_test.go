package main

import (
	"fmt"
	"testing"
)

func TestUnique(t *testing.T) {
	s := Unique([]string{"go", "is", "go", "fun"})
	if len(s) != 3 {
		t.Errorf("len(Unique([go is go fun])) = %d, want 3", len(s))
	}
	for _, w := range []string{"go", "is", "fun"} {
		if _, ok := s[w]; !ok {
			t.Errorf("Unique 的結果少了 %q", w)
		}
	}
	if got, want := fmt.Sprintf("%T", s), "map[string]struct {}"; got != want {
		t.Errorf("%%T 印出 %q, want %q（Set 要是別名，不是新的自訂型別）", got, want)
	}
}
