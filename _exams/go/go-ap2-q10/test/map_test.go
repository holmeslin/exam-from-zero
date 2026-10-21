package main

import (
	"slices"
	"strconv"
	"testing"
)

func TestMap(t *testing.T) {
	sq := Map([]int{1, 2, 3}, func(n int) int { return n * n })
	if want := []int{1, 4, 9}; !slices.Equal(sq, want) {
		t.Errorf("Map 平方 = %v, want %v", sq, want)
	}
	s := Map([]int{7, 42}, strconv.Itoa)
	if want := []string{"7", "42"}; !slices.Equal(s, want) {
		t.Errorf("Map(strconv.Itoa) = %q, want %q", s, want)
	}
	l := Map([]string{"go", "pprof"}, func(s string) int { return len(s) })
	if want := []int{2, 5}; !slices.Equal(l, want) {
		t.Errorf("Map 長度 = %v, want %v", l, want)
	}
	if e := Map([]int{}, strconv.Itoa); len(e) != 0 {
		t.Errorf("Map 空切片 = %v, want 空", e)
	}
}
