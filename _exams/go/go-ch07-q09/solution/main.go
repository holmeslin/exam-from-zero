package main

import "iter"

// Take 回傳一個新的迭代器，只交出 seq 的前 n 個值。
// seq 可能是無限的；交完 n 個就要停，不能再向 seq 多拿值。
// n <= 0 時什麼都不交出。
func Take[V any](seq iter.Seq[V], n int) iter.Seq[V] {
	return func(yield func(V) bool) {
		if n <= 0 {
			return
		}
		count := 0
		for v := range seq {
			if !yield(v) {
				return
			}
			count++
			if count == n {
				return
			}
		}
	}
}

func main() {}
