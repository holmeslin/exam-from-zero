package main

import "fmt"

func main() {
	var evens []int
	for i := 1; i <= 20; i++ {
		if i%2 == 0 {
			evens = append(evens, i)
		}
	}
	fmt.Println(evens)
	fmt.Println("長度：", len(evens))
}
