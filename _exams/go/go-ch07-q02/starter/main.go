package main

import "iter"

// CountUp 回傳一個迭代器，依序交出 1, 2, ..., n。
func CountUp(n int) iter.Seq[int] {
	return func(yield func(int) bool) {
		// TODO: 用迴圈交出 1 到 n，記得檢查 yield 的回傳值
	}
}

func main() {}
