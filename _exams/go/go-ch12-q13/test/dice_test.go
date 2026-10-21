package main

import (
	"math/rand/v2"
	"slices"
	"testing"
)

func TestRollDiceSeeded(t *testing.T) {
	got := RollDice(rand.New(rand.NewPCG(1, 2)), 5)
	want := []int{5, 4, 5, 5, 2}
	if !slices.Equal(got, want) {
		t.Errorf("種子 (1, 2) 擲 5 次 = %v, want %v（要用傳進來的 r，每次呼叫 r.IntN 一次）", got, want)
	}
}

func TestRollDiceRange(t *testing.T) {
	rolls := RollDice(rand.New(rand.NewPCG(7, 7)), 600)
	if len(rolls) != 600 {
		t.Fatalf("len(RollDice(r, 600)) = %d, want 600", len(rolls))
	}
	seen := map[int]bool{}
	for _, v := range rolls {
		if v < 1 || v > 6 {
			t.Fatalf("擲出 %d，點數應該在 1～6 之間", v)
		}
		seen[v] = true
	}
	if len(seen) != 6 {
		t.Errorf("擲 600 次只出現過 %v，1～6 每種點數都應該出現", seen)
	}
}
