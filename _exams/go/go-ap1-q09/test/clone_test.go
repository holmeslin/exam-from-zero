package main

import (
	"fmt"
	"testing"
)

func TestClone(t *testing.T) {
	s := []int{1, 2, 3}
	c := Clone(s)
	if fmt.Sprint(c) != "[1 2 3]" {
		t.Fatalf("Clone([1 2 3]) = %v, want [1 2 3]", c)
	}
	c[0] = 100
	if s[0] != 1 {
		t.Errorf("改了 Clone 回傳的切片後，原本的 s 變成 %v；want [1 2 3]（兩者不能共用底層陣列）", s)
	}
}

func TestCloneEmpty(t *testing.T) {
	if c := Clone([]int{}); len(c) != 0 {
		t.Errorf("Clone([]) 的長度 = %d, want 0", len(c))
	}
}
