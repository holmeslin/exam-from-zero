package main

import (
	"context"
	"errors"
	"testing"
	"time"
)

func TestProduce(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	out := make(chan int)
	result := make(chan error, 1)
	go func() { result <- Produce(ctx, out) }()

	for want := 1; want <= 3; want++ {
		select {
		case got := <-out:
			if got != want {
				t.Fatalf("第 %d 個數字 = %d, want %d", want, got, want)
			}
		case err := <-result:
			t.Fatalf("還沒取消 Produce 就回傳了（err = %v），應該持續送出數字", err)
		case <-time.After(500 * time.Millisecond):
			t.Fatalf("等不到第 %d 個數字", want)
		}
	}

	cancel()
	select {
	case err := <-result:
		if !errors.Is(err, context.Canceled) {
			t.Errorf("取消後 Produce 回傳 %v, want context.Canceled", err)
		}
	case <-time.After(500 * time.Millisecond):
		t.Fatal("取消後 Produce 沒有結束：記得在 select 裡監看 <-ctx.Done()")
	}
}
