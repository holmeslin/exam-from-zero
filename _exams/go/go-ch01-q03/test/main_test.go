package main

import "testing"

func TestGrade(t *testing.T) {
	for score, want := range map[int]string{100: "A", 90: "A", 89: "B", 80: "B", 79: "C", 0: "C"} {
		if got := Grade(score); got != want {
			t.Errorf("Grade(%d) = %q, want %q", score, got, want)
		}
	}
}
