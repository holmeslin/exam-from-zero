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
	c.mu.Lock()
	defer c.mu.Unlock()
	c.counts[name]++
}

// Get 回傳 name 目前的次數。
func (c *Counter) Get(name string) int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.counts[name]
}

func main() {}
