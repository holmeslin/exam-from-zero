package main

import (
	"fmt"

	"q/en/greet"
	zhgreet "q/zh/greet"
)

func main() {
	fmt.Println(greet.Hello("Andy"))
	fmt.Println(zhgreet.Hello("Andy"))
}
