package main

import (
	"slices"
	"testing"
	"time"
)

func collectForTest(t *testing.T, name string, ch <-chan int) []int {
	t.Helper()
	got := []int{}
	for {
		select {
		case v, ok := <-ch:
			if !ok {
				return got
			}
			got = append(got, v)
		case <-time.After(time.Second):
			t.Fatalf("%s：收到 %v 之後等了 1 秒，輸出的 channel 沒有新的值也沒有關閉（忘了 close(out)？）", name, got)
		}
	}
}

func TestPipeline(t *testing.T) {
	cases := []struct {
		name string
		ch   <-chan int
		want []int
	}{
		{"OnlyOdd(Square(Generate(1, 2, 3, 4, 5)))", OnlyOdd(Square(Generate(1, 2, 3, 4, 5))), []int{1, 9, 25}},
		{"Square(Square(Generate(1, 2, 3)))", Square(Square(Generate(1, 2, 3))), []int{1, 16, 81}},
		{"OnlyOdd(Generate(1, 2, 3, 4, 5))", OnlyOdd(Generate(1, 2, 3, 4, 5)), []int{1, 3, 5}},
		{"Square(Generate())", Square(Generate()), []int{}},
	}
	for _, c := range cases {
		if got := collectForTest(t, c.name, c.ch); !slices.Equal(got, c.want) {
			t.Errorf("%s 收到 %v，想要 %v", c.name, got, c.want)
		}
	}
}
