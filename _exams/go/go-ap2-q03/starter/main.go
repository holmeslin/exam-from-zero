package main

// initCount 記錄 loadConfig 被呼叫幾次（測試會檢查它）。
var initCount int

func loadConfig() map[string]string {
	initCount++
	return map[string]string{"env": "prod"}
}

var config map[string]string

// GetConfig 可能同時被很多 goroutine 呼叫。
// 要求：loadConfig 只能被呼叫一次，而且每個呼叫者都要看得到載入好的 config。
func GetConfig() map[string]string {
	// TODO: 改用 sync.Once，不要每次都重新載入
	config = loadConfig()
	return config
}

func main() {}
