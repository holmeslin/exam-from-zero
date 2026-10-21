package main

import "time"

// Receive 從 ch 接收一個值，最多等 d 這麼久。
// 收到時回傳該值和 true；逾時回傳 0 和 false。
func Receive(ch <-chan int, d time.Duration) (int, bool) {
	select {
	case v := <-ch:
		return v, true
	case <-time.After(d):
		return 0, false
	}
}

func main() {}
