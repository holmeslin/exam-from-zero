package main

import (
	"iter"
	"slices"
	"testing"
)

// naturals 是無限序列 0, 1, 2, ...，並記錄總共交出了幾個值。
func naturals(produced *int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := 0; ; i++ {
			*produced++
			if !yield(i) {
				return
			}
		}
	}
}

func TestTakeInfinite(t *testing.T) {
	produced := 0
	got := slices.Collect(Take(naturals(&produced), 3))
	if !slices.Equal(got, []int{0, 1, 2}) {
		t.Errorf("Take(naturals, 3) = %v，want [0 1 2]", got)
	}
	if produced != 3 {
		t.Errorf("來源交出了 %d 個值，want 3（交完 n 個就該停，不要多拿）", produced)
	}
}

func TestTakeShortSource(t *testing.T) {
	got := slices.Collect(Take(slices.Values([]string{"a", "b"}), 5))
	if !slices.Equal(got, []string{"a", "b"}) {
		t.Errorf("Take([a b], 5) = %v，want [a b]", got)
	}
}

func TestTakeZero(t *testing.T) {
	produced := 0
	for _, n := range []int{0, -1} {
		got := slices.Collect(Take(naturals(&produced), n))
		if len(got) != 0 {
			t.Errorf("Take(naturals, %d) = %v，want []", n, got)
		}
	}
	if produced != 0 {
		t.Errorf("n <= 0 時來源交出了 %d 個值，want 0", produced)
	}
}

func TestTakeBreak(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("break 之後 panic 了：%v（yield 回傳 false 時要 return）", r)
		}
	}()
	produced := 0
	var got []int
	for v := range Take(naturals(&produced), 10) {
		got = append(got, v)
		if v == 1 {
			break
		}
	}
	if !slices.Equal(got, []int{0, 1}) {
		t.Errorf("在 1 時 break，拿到 %v，want [0 1]", got)
	}
}
