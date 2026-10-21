package main

import "testing"

type bigCount int64

func TestTotal(t *testing.T) {
	if got := Total([]int{1, 2, 3}); got != 6 {
		t.Errorf("Total([]int{1, 2, 3}) = %d, want 6", got)
	}
	got := Total([]Score{80, 95, 70})
	if s := got.String(); s != "245 分" {
		t.Errorf("Total([]Score{80, 95, 70}).String() = %q, want %q", s, "245 分")
	}
	if got := Total([]bigCount{1, 2}); got != 3 {
		t.Errorf("Total([]bigCount{1, 2}) = %d, want 3（bigCount 的底層型別是 int64）", got)
	}
}
