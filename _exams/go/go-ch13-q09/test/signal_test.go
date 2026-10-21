package main

import (
	"os"
	"os/signal"
	"syscall"
	"testing"
	"time"
)

func TestProcessAll(t *testing.T) {
	ctx, stop := NewContext()
	defer stop()
	calls := 0
	done, err := Process(ctx, 4, func(int) { calls++ })
	if done != 4 || err != nil || calls != 4 {
		t.Errorf("沒有訊號時 Process(ctx, 4, ...) = (%d, %v)，呼叫 step %d 次；want (4, <nil>)，呼叫 4 次", done, err, calls)
	}
}

func TestProcessInterrupted(t *testing.T) {
	// 保險：就算 NewContext 沒攔截 SIGINT，測試程式也不會被直接結束
	guard := make(chan os.Signal, 1)
	signal.Notify(guard, os.Interrupt)
	defer signal.Stop(guard)

	ctx, stop := NewContext()
	defer stop()

	var steps []int
	done, err := Process(ctx, 10, func(i int) {
		steps = append(steps, i)
		if i != 3 {
			return
		}
		// 做完第 3 個項目時，假裝使用者按下 Ctrl+C
		if err := syscall.Kill(os.Getpid(), syscall.SIGINT); err != nil {
			t.Fatalf("送出 SIGINT 失敗：%v", err)
		}
		select {
		case <-ctx.Done():
		case <-time.After(2 * time.Second):
			t.Fatalf("送出 SIGINT 後，NewContext 回傳的 ctx 沒有被取消（有用 signal.NotifyContext 攔截 os.Interrupt 嗎？）")
		}
	})
	if done != 3 || len(steps) != 3 {
		t.Errorf("收到訊號後 Process 回傳 done = %d、step 被呼叫 %d 次，want 3 和 3（收到訊號後不該再處理下一個項目）", done, len(steps))
	}
	if err == nil {
		t.Errorf("被中斷時 Process 應該回傳 context.Cause(ctx)，卻得到 nil")
	}
}
