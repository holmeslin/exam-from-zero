package main

import "sync"

type result struct {
	i     int
	value int
}

// Process 用固定 workers 個 goroutine（worker pool）處理 jobs：
// 每個工作 n 的結果是 work(n)。
// 回傳的切片要和 jobs 一一對應：第 i 格放 work(jobs[i])。
// 同時在呼叫 work 的 goroutine 不可以超過 workers 個。
func Process(jobs []int, workers int, work func(int) int) []int {
	indexes := make(chan int)
	results := make(chan result)

	var wg sync.WaitGroup
	for range workers {
		wg.Go(func() {
			for i := range indexes {
				results <- result{i: i, value: work(jobs[i])}
			}
		})
	}

	go func() {
		for i := range jobs {
			indexes <- i
		}
		close(indexes)
	}()

	go func() {
		wg.Wait()
		close(results)
	}()

	out := make([]int, len(jobs))
	for r := range results {
		out[r.i] = r.value
	}
	return out
}

func main() {}
