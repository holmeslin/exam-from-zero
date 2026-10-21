package main

import (
	"sync"
	"testing"
)

func TestGetConfig(t *testing.T) {
	const n = 50
	results := make([]map[string]string, n)
	var wg sync.WaitGroup
	for i := range n {
		wg.Add(1)
		go func() {
			defer wg.Done()
			results[i] = GetConfig()
		}()
	}
	wg.Wait()
	if initCount != 1 {
		t.Errorf("loadConfig 被呼叫了 %d 次, want 1", initCount)
	}
	for i, r := range results {
		if r["env"] != "prod" {
			t.Fatalf("第 %d 個呼叫拿到 %v, want map[env:prod]", i, r)
		}
	}
	GetConfig()
	if initCount != 1 {
		t.Errorf("之後再呼叫 GetConfig，loadConfig 共被呼叫 %d 次, want 1", initCount)
	}
}
