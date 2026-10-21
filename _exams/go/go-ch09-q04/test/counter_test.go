package main

import (
	"sync"
	"testing"
)

func TestCounterConcurrent(t *testing.T) {
	c := NewCounter()
	var wg sync.WaitGroup
	for range 50 {
		wg.Go(func() {
			for range 200 {
				c.Add("小明")
				c.Add("小美")
			}
		})
	}
	wg.Wait()
	for _, name := range []string{"小明", "小美"} {
		if got := c.Get(name); got != 10000 {
			t.Errorf("50 個 goroutine 各 Add(%q) 200 次後 Get(%q) = %d，想要 10000", name, name, got)
		}
	}
	if got := c.Get("沒出現過"); got != 0 {
		t.Errorf("Get(\"沒出現過\") = %d，想要 0", got)
	}
}
