package main

import "fmt"

func main() {
	sum := 0
	for i := range 100 {
		sum += i + 1
	}
	fmt.Println("總和：", sum)
}
