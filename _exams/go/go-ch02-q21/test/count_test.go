package main

import "testing"

func TestCountRune(t *testing.T) {
	text := "吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮"
	cases := []struct {
		s      string
		target rune
		want   int
	}{
		{text, '葡', 4},
		{text, '吐', 2},
		{text, '，', 1},
		{text, '貓', 0},
		{"banana", 'a', 3},
		{"", 'a', 0},
	}
	for _, c := range cases {
		if got := countRune(c.s, c.target); got != c.want {
			t.Errorf("countRune(%q, '%c') = %d, want %d", c.s, c.target, got, c.want)
		}
	}
}
