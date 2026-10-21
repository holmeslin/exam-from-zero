package main

// Countdown 回傳一個只能接收的 channel，
// 背景的 goroutine 會依序送出 n, n-1, ..., 1，送完就關閉 channel。
func Countdown(n int) <-chan int {
	out := make(chan int)
	go func() {
		// TODO: 依序送出 n 到 1，送完記得關閉 out
	}()
	return out
}

func main() {}
