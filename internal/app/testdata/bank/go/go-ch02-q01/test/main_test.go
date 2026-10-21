package main

import "testing"

func TestMul(t *testing.T) {
	if got := Mul(6, 3); got != 18 {
		t.Fatalf("Mul(6, 3) = %d, want 18", got)
	}
}
