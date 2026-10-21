package main

import "fmt"

func main() {
	battery := 15
	if battery < 20 {
		fmt.Println("電量不足，請充電")
	}
	fmt.Println("目前電量：", battery)
}
