package main

import (
	"embed"
	"fmt"
)

//go:embed hello.txt
var greeting string

//go:embed menu
var menu embed.FS

func main() {
	fmt.Print(greeting)

	entries, err := menu.ReadDir("menu")
	if err != nil {
		fmt.Println("錯誤:", err)
		return
	}
	for _, e := range entries {
		fmt.Println(e.Name())
	}

	data, err := menu.ReadFile("menu/tea.txt")
	if err != nil {
		fmt.Println("錯誤:", err)
		return
	}
	fmt.Print(string(data))
}
