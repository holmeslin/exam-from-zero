package main

import "fmt"

func main() {
	savings := 0
	weeks := 0
	for savings < 1000 {
		savings += 150
		weeks++
	}
	fmt.Println("存了", weeks, "週，共", savings, "元")
}
