package main

import "testing"

func TestCompose(t *testing.T) {
	double := func(n int) int { return n * 2 }
	addOne := func(n int) int { return n + 1 }

	if got := Compose(double, addOne)(5); got != 11 {
		t.Errorf("Compose(double, addOne)(5) = %d, want 11（先乘 2 再加 1）", got)
	}
	if got := Compose(addOne, double)(5); got != 12 {
		t.Errorf("Compose(addOne, double)(5) = %d, want 12（先加 1 再乘 2）", got)
	}
	if got := Compose()(42); got != 42 {
		t.Errorf("Compose()(42) = %d, want 42（沒有函式時原封不動）", got)
	}
	ops := []func(int) int{addOne, addOne, double}
	if got := Compose(ops...)(0); got != 4 {
		t.Errorf("Compose(addOne, addOne, double)(0) = %d, want 4", got)
	}
}
