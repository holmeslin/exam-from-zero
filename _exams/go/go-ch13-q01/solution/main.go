package main

import (
	"fmt"
	"os"
)

// Greet 收到的 args 和 os.Args 一樣：args[0] 是程式本身，真正的參數從 args[1] 開始。
func Greet(args []string) []string {
	if len(args) < 2 {
		return []string{"用法：greet <名字>..."}
	}
	var lines []string
	for _, name := range args[1:] {
		lines = append(lines, "哈囉，"+name)
	}
	return lines
}

func main() {
	for _, line := range Greet(os.Args) {
		fmt.Println(line)
	}
}
