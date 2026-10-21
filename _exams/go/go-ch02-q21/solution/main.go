package main

import "fmt"

func countRune(s string, target rune) int {
	count := 0
	for _, r := range s {
		if r == target {
			count++
		}
	}
	return count
}

func main() {
	text := "吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮"
	fmt.Println("葡：", countRune(text, '葡'))
	fmt.Println("吐：", countRune(text, '吐'))
}
