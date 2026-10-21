package main

import "fmt"

func checkPost(text string) {
	count := len([]rune(text))
	fmt.Println(text)
	fmt.Println("byte 數：", len(text), "字數：", count)
	if count > 10 {
		fmt.Println("超過 10 個字")
		return
	}
	fmt.Println("可以發布")
}

func main() {
	checkPost("Hello Go")
	checkPost("今天天氣很好適合出去走走")
}
