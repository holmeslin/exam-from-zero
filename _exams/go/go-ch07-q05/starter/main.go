package main

import "iter"

// Closed 記錄迭代器收尾的次數。
var Closed int

// Lines 模擬一行一行讀檔案。
// 這個版本有兩個問題：
//  1. 迴圈 break 時會 panic
//  2. 提早結束時沒有收尾（Closed 沒有加 1）
func Lines(lines []string) iter.Seq[string] {
	return func(yield func(string) bool) {
		for _, s := range lines {
			yield(s)
		}
		Closed++
	}
}

func main() {}
