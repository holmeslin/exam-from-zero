package main

import "testing"

func TestSub(t *testing.T) {
	if got := Sub(6, 3); got != 3 {
		t.Fatalf("Sub(6, 3) = %d, want 3", got)
	}
}
