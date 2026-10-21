package greet_test

import (
	"fmt"

	"q/greet"
)

func ExampleHello() {
	fmt.Println(greet.Hello("小明"))
	// Output:
	// 你好，小明！
}

// TODO: 寫一個 Bye 的 Example 函式
