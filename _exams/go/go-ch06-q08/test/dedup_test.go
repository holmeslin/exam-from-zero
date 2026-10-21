package main

import (
	"slices"
	"testing"
)

type point struct{ X, Y int }

func TestDedup(t *testing.T) {
	if got, want := Dedup([]int{3, 1, 3, 2, 1}), []int{3, 1, 2}; !slices.Equal(got, want) {
		t.Errorf("Dedup([3 1 3 2 1]) = %v, want %v", got, want)
	}
	if got, want := Dedup([]string{"貓", "狗", "貓", "貓"}), []string{"貓", "狗"}; !slices.Equal(got, want) {
		t.Errorf("Dedup([貓 狗 貓 貓]) = %v, want %v", got, want)
	}
	if got, want := Dedup([]point{{1, 2}, {3, 4}, {1, 2}}), []point{{1, 2}, {3, 4}}; !slices.Equal(got, want) {
		t.Errorf("Dedup(points) = %v, want %v", got, want)
	}
	if got := Dedup([]int{}); len(got) != 0 {
		t.Errorf("Dedup([]) = %v, want 空切片", got)
	}
}
