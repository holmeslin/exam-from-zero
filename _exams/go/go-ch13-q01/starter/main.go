package main

import (
	"fmt"
	"os"
)

// Greet 收到的 args 和 os.Args 一樣：args[0] 是程式本身，真正的參數從 args[1] 開始。
func Greet(args []string) []string {
	// TODO：沒有參數時回傳用法說明；有參數時每個名字一行「哈囉，名字」
	return nil
}

func main() {
	for _, line := range Greet(os.Args) {
		fmt.Println(line)
	}
}
