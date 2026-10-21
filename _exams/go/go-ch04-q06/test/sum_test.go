package main

import "testing"

func TestSumInts(t *testing.T) {
	cases := []struct {
		items []any
		want  int
	}{
		{[]any{1, 2, 3}, 6},
		{[]any{1, "two", 3.0, true, 10}, 11},
		{[]any{"a", 2.5, nil}, 0},
		{[]any{-4, "x", 7}, 3},
	}
	for _, c := range cases {
		if got := SumInts(c.items); got != c.want {
			t.Errorf("SumInts(%v) = %d, want %d", c.items, got, c.want)
		}
	}
}
