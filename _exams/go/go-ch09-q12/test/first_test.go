package main

import (
	"runtime"
	"testing"
	"time"
)

func TestFirstResult(t *testing.T) {
	fns := []func() string{
		func() string { time.Sleep(20 * time.Millisecond); return "慢" },
		func() string { return "快" },
		func() string { time.Sleep(20 * time.Millisecond); return "也慢" },
	}
	if got := First(fns); got != "快" {
		t.Errorf("First() = %q，想要 %q", got, "快")
	}
}

func TestFirstNoLeak(t *testing.T) {
	base := runtime.NumGoroutine()
	fns := []func() string{
		func() string { return "A" },
		func() string { return "B" },
		func() string { return "C" },
	}
	for range 10 {
		First(fns)
	}
	extra := 0
	for range 50 {
		extra = runtime.NumGoroutine() - base
		if extra <= 0 {
			return
		}
		time.Sleep(10 * time.Millisecond)
	}
	t.Errorf("呼叫 10 次 First 之後，還有 %d 個 goroutine 一直沒結束（goroutine 洩漏），想要 0 個", extra)
}
