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
	// TODO：定義 -name 與 -n，呼叫 fs.Parse(args)，再把結果回傳
	_ = fs
	return "", 0, nil, nil
}

func main() {
	name, n, rest, err := ParseOpts(os.Args[1:])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(2)
	}
	fmt.Println(name, n, rest)
}
