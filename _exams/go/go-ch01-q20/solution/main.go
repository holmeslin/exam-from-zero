package main

import "fmt"

func main() {
	count := 0
	for a := 1; a <= 6; a++ {
		for b := 1; b <= 6; b++ {
			if a+b == 7 {
				fmt.Println(a, "+", b)
				count++
			}
		}
	}
	fmt.Println("共有", count, "種")
}
