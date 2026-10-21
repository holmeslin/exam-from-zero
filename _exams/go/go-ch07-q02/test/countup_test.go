package main

import (
	"slices"
	"testing"
)

func TestCountUp(t *testing.T) {
	for _, n := range []int{0, 1, 4} {
		var got []int
		for v := range CountUp(n) {
			got = append(got, v)
		}
		var want []int
		for i := 1; i <= n; i++ {
			want = append(want, i)
		}
		if !slices.Equal(got, want) {
			t.Errorf("CountUp(%d) 交出 %v，want %v", n, got, want)
		}
	}
}

func TestCountUpBreak(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("break 之後 panic 了：%v（yield 回傳 false 時要 return）", r)
		}
	}()
	var got []int
	for v := range CountUp(10) {
		got = append(got, v)
		if v == 3 {
			break
		}
	}
	if !slices.Equal(got, []int{1, 2, 3}) {
		t.Errorf("在 3 時 break，拿到 %v，want [1 2 3]", got)
	}
}
