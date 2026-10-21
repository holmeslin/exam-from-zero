package main

import (
	"testing"
	"unicode/utf8"
)

func TestReverse(t *testing.T) {
	tests := []struct{ in, want string }{
		{"Go", "oG"},
		{"", ""},
		{"Ή", "Ή"},
		{"你好", "好你"},
		{"a中b", "b中a"},
	}
	for _, tt := range tests {
		if got := Reverse(tt.in); got != tt.want {
			t.Errorf("Reverse(%q) = %q，想要 %q", tt.in, got, tt.want)
		}
	}
}

func FuzzReverseHidden(f *testing.F) {
	for _, s := range []string{"hello", "Go 語言", "αβγ", "😀ok"} {
		f.Add(s)
	}
	f.Fuzz(func(t *testing.T, s string) {
		if !utf8.ValidString(s) {
			return
		}
		r := Reverse(s)
		if !utf8.ValidString(r) {
			t.Errorf("Reverse(%q) = %q，不是合法的 UTF-8", s, r)
		}
		if Reverse(r) != s {
			t.Errorf("Reverse 兩次之後和原本不一樣：%q", s)
		}
	})
}
