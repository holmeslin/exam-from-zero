package main

import "iter"

// Closed 記錄迭代器收尾的次數。
var Closed int

// Lines 模擬一行一行讀檔案。
func Lines(lines []string) iter.Seq[string] {
	return func(yield func(string) bool) {
		defer func() { Closed++ }()
		for _, s := range lines {
			if !yield(s) {
				return
			}
		}
	}
}

func main() {}
