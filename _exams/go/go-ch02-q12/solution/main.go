package main

import "fmt"

func main() {
	scores := [5]int{72, 95, 58, 88, 64}
	total := 0
	highest := scores[0]
	failed := 0
	for _, s := range scores {
		total += s
		if s > highest {
			highest = s
		}
		if s < 60 {
			failed++
		}
	}
	fmt.Println("總分：", total)
	fmt.Println("最高分：", highest)
	fmt.Println("不及格人數：", failed)
}
