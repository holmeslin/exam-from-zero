package main

import (
	"slices"
	"sync"
	"testing"
	"time"
)

func TestProcessResults(t *testing.T) {
	jobs := []int{5, 1, 4, 2, 3}
	got := Process(jobs, 2, func(n int) int { return n * n })
	want := []int{25, 1, 16, 4, 9}
	if !slices.Equal(got, want) {
		t.Errorf("Process(%v, 2, 平方) = %v，想要 %v（順序要和 jobs 對應）", jobs, got, want)
	}
	if got := Process([]int{}, 3, func(n int) int { return n }); len(got) != 0 {
		t.Errorf("Process(空切片) = %v，想要長度 0", got)
	}
}

func TestProcessConcurrency(t *testing.T) {
	const workers = 3
	var mu sync.Mutex
	cur, peak := 0, 0
	work := func(n int) int {
		mu.Lock()
		cur++
		peak = max(peak, cur)
		mu.Unlock()
		time.Sleep(3 * time.Millisecond)
		mu.Lock()
		cur--
		mu.Unlock()
		return n * 10
	}
	jobs := make([]int, 30)
	want := make([]int, 30)
	for i := range jobs {
		jobs[i] = i
		want[i] = i * 10
	}
	got := Process(jobs, workers, work)
	if !slices.Equal(got, want) {
		t.Errorf("Process(0..29, %d, n*10) = %v，想要 %v", workers, got, want)
	}
	if peak > workers {
		t.Errorf("同時有 %d 個 goroutine 在執行 work，超過 workers = %d", peak, workers)
	}
	if peak < 2 {
		t.Errorf("同時最多只有 %d 個 goroutine 在執行 work，看起來沒有開 %d 個工人一起做", peak, workers)
	}
}
