package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("請輸入 email：")
	scanner.Scan()
	email := scanner.Text()
	// TODO: 用 strings.TrimSpace、strings.ToLower 整理 email（記得把結果接回來）
	// TODO: 不包含 @ 就印「格式不對」並結束；否則印出 email，以及「是 .tw 結尾：」和 true/false
	fmt.Println(email)
}
