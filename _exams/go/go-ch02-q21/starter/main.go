package main

import "fmt"

func countRune(s string, target rune) int {
	// TODO: 用 for range 一個字一個字走訪 s，數出 target 出現幾次
	return 0
}

func main() {
	text := "吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮"
	fmt.Println("葡：", countRune(text, '葡'))
	fmt.Println("吐：", countRune(text, '吐'))
}
