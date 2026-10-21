package main

import "iter"

// Equal 回傳兩個迭代器是否交出完全相同的值（個數與順序都一樣）。
// 請用 iter.Pull 同時走訪兩邊，並確保兩邊都有正確收尾。
func Equal[V comparable](a, b iter.Seq[V]) bool {
	nextA, stopA := iter.Pull(a)
	defer stopA()
	nextB, stopB := iter.Pull(b)
	defer stopB()
	for {
		va, okA := nextA()
		vb, okB := nextB()
		if okA != okB || va != vb {
			return false
		}
		if !okA {
			return true
		}
	}
}

func main() {}
