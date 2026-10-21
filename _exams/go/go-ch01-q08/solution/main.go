package main

import "fmt"

func main() {
	number := 13
	if number%2 == 0 {
		fmt.Println(number, "是偶數")
	} else {
		fmt.Println(number, "是奇數")
	}
}
