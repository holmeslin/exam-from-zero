package main

import (
	"context"
	"testing"
	"time"
)

func closed(ch chan struct{}, wait time.Duration) bool {
	select {
	case <-ch:
		return true
	case <-time.After(wait):
		return false
	}
}

func TestCloseOnCancel(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	ch := make(chan struct{})
	CloseOnCancel(ctx, ch)

	if closed(ch, 20*time.Millisecond) {
		t.Fatal("還沒取消 ch 就被關閉了：AfterFunc 只是登記，取消後才執行")
	}
	cancel()
	if !closed(ch, 500*time.Millisecond) {
		t.Fatal("取消後 ch 沒有被關閉")
	}
}

func TestCloseOnCancelAlreadyCanceled(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	ch := make(chan struct{})
	CloseOnCancel(ctx, ch)
	if !closed(ch, 500*time.Millisecond) {
		t.Fatal("登記時 ctx 已經取消，ch 應該馬上被關閉")
	}
}

func TestCloseOnCancelStop(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	ch := make(chan struct{})
	stop := CloseOnCancel(ctx, ch)

	if got := stop(); !got {
		t.Fatalf("第一次 stop() = %v, want true", got)
	}
	cancel()
	if closed(ch, 50*time.Millisecond) {
		t.Fatal("已經 stop() 撤銷登記，取消後 ch 不應該被關閉")
	}
	if got := stop(); got {
		t.Errorf("第二次 stop() = %v, want false", got)
	}
}
