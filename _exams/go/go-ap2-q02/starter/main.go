package main

// SafeCount 啟動 workers 個 goroutine，每個把共用計數器加 1 共 times 次，
// 全部做完後回傳計數器的值。
func SafeCount(workers, times int) int {
	count := 0
	// TODO: 用 sync.WaitGroup 等所有 goroutine 結束，
	// 並用 sync.Mutex 保護 count，讓每次讀寫之間都有 happens-before
	return count
}

func main() {}
