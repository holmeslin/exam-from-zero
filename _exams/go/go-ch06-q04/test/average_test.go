package main

import "testing"

func TestAverage(t *testing.T) {
	if got := Average(); got != 0 {
		t.Errorf("Average() = %v, want 0", got)
	}
	if got := Average(7); got != 7 {
		t.Errorf("Average(7) = %v, want 7", got)
	}
	if got := Average(1, 2, 3, 4); got != 2.5 {
		t.Errorf("Average(1, 2, 3, 4) = %v, want 2.5", got)
	}
	scores := []float64{80, 95, 71}
	if got := Average(scores...); got != 82 {
		t.Errorf("Average(scores...)，scores = %v，得到 %v, want 82", scores, got)
	}
}
