package main

import (
	"fmt"
	"testing"
)

func TestStackAll(t *testing.T) {
	var s Stack
	s.Push(10)
	s.Push(20)
	s.Push(30)
	var got []string
	for pos, v := range s.All() {
		got = append(got, fmt.Sprintf("%d:%d", pos, v))
	}
	want := "[0:30 1:20 2:10]"
	if fmt.Sprint(got) != want {
		t.Errorf("Push 10、20、30 後 All() 交出 %v，want %s", got, want)
	}
}

func TestStackAllEmpty(t *testing.T) {
	var s Stack
	for pos, v := range s.All() {
		t.Errorf("空的 Stack 不該交出任何值，卻交出 %d:%d", pos, v)
	}
}

func TestStackAllBreak(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("break 之後 panic 了：%v（yield 回傳 false 時要 return）", r)
		}
	}()
	var s Stack
	s.Push(1)
	s.Push(2)
	s.Push(3)
	var got []int
	for _, v := range s.All() {
		got = append(got, v)
		break
	}
	if fmt.Sprint(got) != "[3]" {
		t.Errorf("第一次就 break，拿到 %v，want [3]", got)
	}
}
