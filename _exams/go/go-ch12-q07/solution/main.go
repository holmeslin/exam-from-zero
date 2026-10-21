package main

import "bytes"

// ParsePairs 解析像 "name=Andy;city=Taipei" 這樣的 []byte：
// 以 ';' 分成好幾段，每段以第一個 '=' 切成鍵和值。沒有 '=' 的段落直接跳過。
func ParsePairs(data []byte) map[string]string {
	m := map[string]string{}
	for _, part := range bytes.Split(data, []byte(";")) {
		key, value, found := bytes.Cut(part, []byte("="))
		if found {
			m[string(key)] = string(value)
		}
	}
	return m
}

func main() {}
