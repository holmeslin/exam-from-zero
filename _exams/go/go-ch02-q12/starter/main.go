package main

import "fmt"

func main() {
	scores := [5]int{72, 95, 58, 88, 64}
	total := 0
	highest := 0
	failed := 0
	// TODO: 用 for range 走訪 scores，更新總分、最高分、不及格人數
	_ = scores
	fmt.Println("總分：", total)
	fmt.Println("最高分：", highest)
	fmt.Println("不及格人數：", failed)
}
