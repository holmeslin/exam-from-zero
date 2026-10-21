package main

import "testing"

func TestMakeAccumulator(t *testing.T) {
	a := MakeAccumulator(10)
	for i, c := range []struct{ n, want int }{{5, 15}, {1, 16}, {-6, 10}} {
		if got := a(c.n); got != c.want {
			t.Errorf("a 第 %d 次呼叫 a(%d) = %d, want %d", i+1, c.n, got, c.want)
		}
	}
	b := MakeAccumulator(0)
	if got := b(3); got != 3 {
		t.Errorf("新的 b := MakeAccumulator(0)，b(3) = %d, want 3（每個累加器要有自己的累計值）", got)
	}
	if got := a(0); got != 10 {
		t.Errorf("呼叫 b 之後 a(0) = %d, want 10（a 和 b 不能互相影響）", got)
	}
}
