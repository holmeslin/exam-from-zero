package main

import "testing"

func TestDiv(t *testing.T) {
	if got := Div(6, 3); got != 2 {
		t.Fatalf("Div(6, 3) = %d, want 2", got)
	}
}
