package main

// ParsePairs 解析像 "name=Andy;city=Taipei" 這樣的 []byte：
// 以 ';' 分成好幾段，每段以第一個 '=' 切成鍵和值。沒有 '=' 的段落直接跳過。
func ParsePairs(data []byte) map[string]string {
	m := map[string]string{}
	// TODO: 用 bytes 套件處理，不要先把整個 data 轉成 string
	return m
}

func main() {}
