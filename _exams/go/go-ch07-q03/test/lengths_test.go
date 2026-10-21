package main

import (
	"fmt"
	"testing"
)

func TestLengths(t *testing.T) {
	words := []string{"Go", "迭代器", "", "hello"}
	var got []string
	for w, n := range Lengths(words) {
		got = append(got, fmt.Sprintf("%s:%d", w, n))
	}
	want := fmt.Sprint([]string{"Go:2", "迭代器:3", ":0", "hello:5"})
	if fmt.Sprint(got) != want {
		t.Errorf("Lengths(%q) 交出 %v，want %v", words, got, want)
	}
}

func TestLengthsBreak(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("break 之後 panic 了：%v（yield 回傳 false 時要 return）", r)
		}
	}()
	count := 0
	for range Lengths([]string{"a", "b", "c"}) {
		count++
		break
	}
	if count != 1 {
		t.Errorf("第一次就 break，迴圈身體執行了 %d 次，want 1", count)
	}
}
