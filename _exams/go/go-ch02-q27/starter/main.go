package main

import "fmt"

func main() {
	temps := []int{24, 27, 31, 29, 22, 26, 30}
	highest := 0
	lowest := 0
	// TODO: 起始值用第一天的氣溫，迴圈裡用 max、min 更新最高溫和最低溫
	_ = temps
	fmt.Println("最高", highest, "度，最低", lowest, "度，溫差", highest-lowest, "度")
}
