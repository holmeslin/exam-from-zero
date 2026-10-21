package main

import (
	"slices"
	"testing"
)

func TestFilterInts(t *testing.T) {
	got := Filter([]int{45, 60, 88, 100, 59}, func(n int) bool { return n >= 60 })
	if want := []int{60, 88, 100}; !slices.Equal(got, want) {
		t.Errorf("Filter(及格) = %v, want %v", got, want)
	}
}

func TestFilterStrings(t *testing.T) {
	got := Filter([]string{"go", "rust", "c", "java"}, func(s string) bool { return len(s) > 2 })
	if want := []string{"rust", "java"}; !slices.Equal(got, want) {
		t.Errorf("Filter(長度大於 2) = %v, want %v", got, want)
	}
}
