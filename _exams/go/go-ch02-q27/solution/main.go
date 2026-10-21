package main

import "fmt"

func main() {
	temps := []int{24, 27, 31, 29, 22, 26, 30}
	highest := temps[0]
	lowest := temps[0]
	for _, t := range temps {
		highest = max(highest, t)
		lowest = min(lowest, t)
	}
	fmt.Println("最高", highest, "度，最低", lowest, "度，溫差", highest-lowest, "度")
}
