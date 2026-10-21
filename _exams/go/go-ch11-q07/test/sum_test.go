package main

import "testing"

type Vec struct {
	X, Y int
}

func (v Vec) Add(o Vec) Vec {
	return Vec{v.X + o.X, v.Y + o.Y}
}

func TestSum(t *testing.T) {
	if got := (Money(100)).Add(250); got != 350 {
		t.Errorf("Money(100).Add(250) = %d, want 350", got)
	}
	if got := Sum[Money](100, 250, 30); got != 380 {
		t.Errorf("Sum[Money](100, 250, 30) = %d, want 380", got)
	}
	if got := Sum[Money](); got != 0 {
		t.Errorf("Sum[Money]() = %d, want 0", got)
	}
	if got, want := Sum(Vec{1, 2}, Vec{3, 4}, Vec{5, 6}), (Vec{9, 12}); got != want {
		t.Errorf("Sum(Vec{1,2}, Vec{3,4}, Vec{5,6}) = %v, want %v", got, want)
	}
}
