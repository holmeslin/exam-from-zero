package main

import "fmt"

func checkPost(text string) {
	fmt.Println(text)
	// TODO: 印出 byte 數和字數；字數超過 10 印「超過 10 個字」，否則印「可以發布」
}

func main() {
	checkPost("Hello Go")
	checkPost("今天天氣很好適合出去走走")
}
