package main

import "fmt"

// TODO: 用 //go:embed 把 hello.txt 放進 greeting
var greeting string

// TODO: 用 //go:embed 把 menu 資料夾放進一個 embed.FS 變數

func main() {
	fmt.Print(greeting)
	// TODO: 列出 menu 資料夾裡的檔名（每行一個），再印出 menu/tea.txt 的內容
}
