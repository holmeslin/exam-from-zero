package main

import (
	"flag"
	"fmt"
	"io"
	"os"
)

// ParseOpts 解析 args（和 os.Args[1:] 一樣，不含程式名稱）：
//
//	-name 字串，預設 "世界"
//	-n    整數，預設 1
//
// 回傳兩個選項的值、剩下的位置參數，以及解析錯誤。
func ParseOpts(args []string) (name string, n int, rest []string, err error) {
	fs := flag.NewFlagSet("greet", flag.ContinueOnError)
	fs.SetOutput(io.Discard) // 測試時不要把說明印到畫面上
	namePtr := fs.String("name", "世界", "要打招呼的對象")
	nPtr := fs.Int("n", 1, "重複幾次")
	if err := fs.Parse(args); err != nil {
		return "", 0, nil, err
	}
	return *namePtr, *nPtr, fs.Args(), nil
}

func main() {
	name, n, rest, err := ParseOpts(os.Args[1:])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(2)
	}
	fmt.Println(name, n, rest)
}
