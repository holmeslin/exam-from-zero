package main

import "fmt"

func visit(room string) {
	fmt.Println("進入", room)
	defer fmt.Println("離開", room)

	if room == "倉庫" {
		fmt.Println("倉庫上鎖了")
		return
	}
	fmt.Println("在", room, "看書")
}

func main() {
	visit("書房")
	visit("倉庫")
	fmt.Println("回家")
}
