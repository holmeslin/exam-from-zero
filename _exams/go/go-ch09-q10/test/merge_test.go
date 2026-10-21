package main

import (
	"slices"
	"testing"
	"time"
)

func sourceForTest(nums []int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func TestMerge(t *testing.T) {
	cases := []struct {
		a, b, want []int
	}{
		{[]int{1, 3, 5}, []int{2, 4}, []int{1, 2, 3, 4, 5}},
		{[]int{}, []int{7, 0, 7}, []int{0, 7, 7}},
		{[]int{9, 8}, []int{}, []int{8, 9}},
		{[]int{}, []int{}, []int{}},
	}
	for _, c := range cases {
		done := make(chan []int, 1)
		go func() { done <- Merge(sourceForTest(c.a), sourceForTest(c.b)) }()
		select {
		case got := <-done:
			if len(got) != len(c.want) || !slices.Equal(got, c.want) {
				t.Errorf("Merge(%v, %v) = %v，想要 %v", c.a, c.b, got, c.want)
			}
		case <-time.After(2 * time.Second):
			t.Fatalf("Merge(%v, %v) 超過 2 秒還沒回傳（迴圈有沒有在兩個 channel 都關閉後結束？）", c.a, c.b)
		}
	}
}
