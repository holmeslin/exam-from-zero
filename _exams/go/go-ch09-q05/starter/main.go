package main

import "sync/atomic"

// Ticket 是一張只能被搶一次的票。
type Ticket struct {
	taken atomic.Bool
}

// Claim 讓呼叫的人搶票：只有第一個搶的人拿到 true，之後的人一律拿到 false。
// 好幾個 goroutine 同時呼叫也一樣只能有一個人搶到。
func (t *Ticket) Claim() bool {
	// TODO: 用 atomic.Bool 的方法，「檢查還沒被搶、然後標記成已搶」要一次完成
	return false
}

func main() {}
