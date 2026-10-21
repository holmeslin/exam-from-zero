package main

// First 同時執行 fns 裡的每個函式（各開一個 goroutine），回傳最先完成的結果。
// 問題：其他比較慢的 goroutine 送結果時已經沒人接收，會永遠卡住（goroutine 洩漏）。
// 請修好它，讓每個 goroutine 最後都能順利結束。
func First(fns []func() string) string {
	ch := make(chan string, len(fns))
	for _, f := range fns {
		go func() {
			ch <- f()
		}()
	}
	return <-ch
}

func main() {}
