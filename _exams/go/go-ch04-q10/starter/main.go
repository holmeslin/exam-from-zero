package main

import (
	"fmt"
	"io"
)

// Report 把每個名字寫成一行「- 名字」，寫到 w 裡（不是直接印到螢幕）。
func Report(w io.Writer, names []string) {
	for _, n := range names {
		fmt.Println("- " + n)
	}
}

func main() {}
