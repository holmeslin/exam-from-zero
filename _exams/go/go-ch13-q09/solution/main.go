package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

// NewContext 回傳一個收到 Ctrl+C（os.Interrupt）或 SIGTERM 時會被取消的 context，以及 stop 函式。
func NewContext() (context.Context, context.CancelFunc) {
	return signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
}

// Process 依序處理第 1～n 個項目，每處理一個就呼叫 step(i)。
// 每個項目開始前先看 ctx 是不是已經被取消：被取消就不再處理，
// 回傳已完成的個數和 context.Cause(ctx)；全部做完回傳 n, nil。
func Process(ctx context.Context, n int, step func(i int)) (int, error) {
	done := 0
	for i := 1; i <= n; i++ {
		select {
		case <-ctx.Done():
			return done, context.Cause(ctx)
		default:
		}
		step(i)
		done++
	}
	return done, nil
}

func main() {
	ctx, stop := NewContext()
	defer stop()
	done, err := Process(ctx, 5, func(i int) { fmt.Printf("第 %d 個項目完成\n", i) })
	if err != nil {
		fmt.Fprintf(os.Stderr, "中斷：已完成 %d 個項目（%v）\n", done, err)
	}
}
