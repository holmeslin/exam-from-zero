package main

import (
	"context"
	"time"
)

// SlowQuery 模擬一個要花 d 的查詢：做完回傳 "完成", nil；
// ctx 先被取消（或逾時）就立刻回傳 "", ctx.Err()。
func SlowQuery(ctx context.Context, d time.Duration) (string, error) {
	// TODO: time.Sleep 叫不醒，改用 select 同時等 time.After(d) 和 <-ctx.Done()
	time.Sleep(d)
	return "完成", nil
}

func main() {}
