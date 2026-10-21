package main

import "testing"

func TestSwap(t *testing.T) {
	x, y := 3, 8
	Swap(&x, &y)
	if x != 8 || y != 3 {
		t.Errorf("x, y := 3, 8; Swap(&x, &y) 之後 x, y = %d, %d, want 8, 3", x, y)
	}
}
