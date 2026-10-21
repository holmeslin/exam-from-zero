package main

import "slices"

// Merge 把 a、b 兩個 channel 送來的數字全部收齊，由小到大排序後回傳。
// a、b 各自送完都會被關閉；兩個都關閉之後才回傳。
func Merge(a, b <-chan int) []int {
	all := []int{}
	for a != nil || b != nil {
		select {
		case n, ok := <-a:
			if !ok {
				a = nil
				continue
			}
			all = append(all, n)
		case n, ok := <-b:
			if !ok {
				b = nil
				continue
			}
			all = append(all, n)
		}
	}
	slices.Sort(all)
	return all
}

func main() {}
