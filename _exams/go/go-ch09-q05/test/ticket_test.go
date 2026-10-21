package main

import (
	"sync"
	"sync/atomic"
	"testing"
)

func TestClaimSequential(t *testing.T) {
	var tk Ticket
	if !tk.Claim() {
		t.Errorf("第一次 Claim() = false，想要 true")
	}
	if tk.Claim() {
		t.Errorf("第二次 Claim() = true，想要 false")
	}
}

func TestClaimConcurrent(t *testing.T) {
	var tk Ticket
	var winners atomic.Int32
	var wg sync.WaitGroup
	for range 100 {
		wg.Go(func() {
			if tk.Claim() {
				winners.Add(1)
			}
		})
	}
	wg.Wait()
	if got := winners.Load(); got != 1 {
		t.Errorf("100 個 goroutine 同時 Claim()，搶到的人數 = %d，想要 1", got)
	}
}
