package main

import "fmt"

func main() {
	original := []int{3, 1, 4}
	backup := original // 這樣是共用底層陣列，不是複製！
	// TODO: 改成準備長度 3 的 backup，用 copy 複製，並印出「複製了 N 個」
	original[0] = 99
	fmt.Println("original:", original)
	fmt.Println("backup:", backup)
}
