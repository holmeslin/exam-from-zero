package main

import "fmt"

func main() {
	for i := 10; i > 0; i -= 2 {
		fmt.Println(i)
	}
	fmt.Println("發射！")
}
