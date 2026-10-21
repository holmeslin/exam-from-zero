package main

import (
	"slices"
	"testing"
)

func TestLinesFull(t *testing.T) {
	Closed = 0
	var got []string
	for s := range Lines([]string{"a", "b", "c"}) {
		got = append(got, s)
	}
	if !slices.Equal(got, []string{"a", "b", "c"}) {
		t.Errorf("走完全部交出 %v，want [a b c]", got)
	}
	if Closed != 1 {
		t.Errorf("正常走完後 Closed = %d，want 1", Closed)
	}
}

func TestLinesBreak(t *testing.T) {
	Closed = 0
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("break 之後 panic 了：%v（yield 回傳 false 時要 return）", r)
		}
	}()
	var got []string
	for s := range Lines([]string{"a", "b", "c"}) {
		got = append(got, s)
		if s == "b" {
			break
		}
	}
	if !slices.Equal(got, []string{"a", "b"}) {
		t.Errorf("在 b 時 break，拿到 %v，want [a b]", got)
	}
	if Closed != 1 {
		t.Errorf("break 提早結束後 Closed = %d，want 1（提早結束也要收尾）", Closed)
	}
}
