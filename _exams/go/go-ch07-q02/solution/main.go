package main

import "iter"

// CountUp 回傳一個迭代器，依序交出 1, 2, ..., n。
func CountUp(n int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := 1; i <= n; i++ {
			if !yield(i) {
				return
			}
		}
	}
}

func main() {}
