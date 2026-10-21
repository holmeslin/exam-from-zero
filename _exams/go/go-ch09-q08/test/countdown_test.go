package main

import (
	"slices"
	"testing"
	"time"
)

// receiveAllForTest 一直接收到 channel 關閉；超過 0.5 秒沒動靜就當作失敗。
func receiveAllForTest(t *testing.T, ch <-chan int) ([]int, bool) {
	t.Helper()
	got := []int{}
	for {
		select {
		case v, ok := <-ch:
			if !ok {
				return got, true
			}
			got = append(got, v)
		case <-time.After(500 * time.Millisecond):
			return got, false
		}
	}
}

func TestCountdown(t *testing.T) {
	for _, n := range []int{3, 1, 0, 5} {
		want := []int{}
		for i := n; i > 0; i-- {
			want = append(want, i)
		}
		got, closed := receiveAllForTest(t, Countdown(n))
		if !closed {
			t.Errorf("Countdown(%d)：收到 %v 之後等了 0.5 秒，channel 既沒有新的值也沒有關閉（忘了 close？）", n, got)
			continue
		}
		if !slices.Equal(got, want) {
			t.Errorf("Countdown(%d) 收到 %v，想要 %v", n, got, want)
		}
	}
}
