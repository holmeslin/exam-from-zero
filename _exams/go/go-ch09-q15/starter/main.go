package main

import "time"

// Receive 從 ch 接收一個值，最多等 d 這麼久。
// 收到時回傳該值和 true；逾時回傳 0 和 false。
func Receive(ch <-chan int, d time.Duration) (int, bool) {
	// TODO: 用 select 搭配 time.After(d)
	return 0, false
}

func main() {}
