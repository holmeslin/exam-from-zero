package main

import "sync"

// Counter 可以讓好幾個 goroutine 同時計數。
type Counter struct {
	mu     sync.Mutex
	counts map[string]int
}

func NewCounter() *Counter {
	return &Counter{counts: map[string]int{}}
}

// Add 把 name 的次數加 1。
func (c *Counter) Add(name string) {
	// TODO: 先上鎖，再修改 c.counts
}

// Get 回傳 name 目前的次數。
func (c *Counter) Get(name string) int {
	// TODO: 讀也要上鎖
	return 0
}

func main() {}
