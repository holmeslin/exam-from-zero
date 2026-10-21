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

func ExampleBye() {
	fmt.Println(greet.Bye("小明"))
	// Output:
	// 再見，小明！
}
