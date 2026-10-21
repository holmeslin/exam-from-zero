package main

import "fmt"

func main() {
	nums := []int{1, 2, 3, 4, 5}
	squares := make([]int, len(nums))

	// TODO: 用 sync.WaitGroup 的 wg.Go 為每個數字開一個 goroutine，
	// 把平方寫進 squares 裡「自己的格子」，等全部做完再印出來

	fmt.Println(squares)
}
