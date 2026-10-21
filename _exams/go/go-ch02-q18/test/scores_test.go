package main

import (
	"fmt"
	"testing"
)

func TestAddScore(t *testing.T) {
	got := addScore([]int{70, 80}, 90)
	if fmt.Sprint(got) != "[70 80 90]" {
		t.Errorf("addScore([70 80], 90) = %v, want [70 80 90]", got)
	}
	got = addScore(nil, 60)
	if fmt.Sprint(got) != "[60]" {
		t.Errorf("addScore(nil, 60) = %v, want [60]", got)
	}
}

func TestAddBonus(t *testing.T) {
	s := []int{70, 80, 90}
	addBonus(s, 5)
	if fmt.Sprint(s) != "[75 85 95]" {
		t.Errorf("addBonus([70 80 90], 5) 之後切片是 %v, want [75 85 95]（要用索引改元素，呼叫端才看得到）", s)
	}
}
