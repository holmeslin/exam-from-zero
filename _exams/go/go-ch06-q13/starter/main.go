package main

import "fmt"

func main() {
	scores := []int{72, 95, 60, 88}
	fmt.Println(scores)

	// TODO: 用 slices 套件依序印出（每行一個結果）：
	// 1. 最高分和最低分（同一行，用 fmt.Println(最高, 最低)）
	// 2. scores 裡有沒有 88
	// 3. 複製一份 scores 叫 sorted，把 sorted 由小到大排序後印出
	// 4. 再印一次 scores，確認原本的順序沒有被改到
}
