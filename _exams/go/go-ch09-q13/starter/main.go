package main

// Process 用固定 workers 個 goroutine（worker pool）處理 jobs：
// 每個工作 n 的結果是 work(n)。
// 回傳的切片要和 jobs 一一對應：第 i 格放 work(jobs[i])。
// 同時在呼叫 work 的 goroutine 不可以超過 workers 個。
func Process(jobs []int, workers int, work func(int) int) []int {
	// TODO: 開 workers 個工人從 channel 拿工作，
	// 派工的人送完要 close，另開一個 goroutine 在 wg.Wait() 之後關閉結果的 channel
	return nil
}

func main() {}
