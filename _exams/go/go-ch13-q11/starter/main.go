package main

import (
	"io"
	"os"
)

// run 是 find 工具的主體：從 stdin 一行一行讀，把含有指定字詞的行寫到 stdout。
//
//	用法：find [-i] [-n] <字詞>
//	-i  不分大小寫
//	-n  每行前面加上行號，格式是「行號:內容」，例如 "2:Go is fun"
//
// 回傳結束碼：成功 0；-h 也算成功，回傳 0；選項打錯或位置參數不是剛好 1 個，回傳 2；讀取失敗回傳 1。
// 所有錯誤訊息與說明都寫到 stderr，不要寫到 stdout。
func run(args []string, stdin io.Reader, stdout, stderr io.Writer) int {
	// TODO：flag.NewFlagSet("find", flag.ContinueOnError)，並用 SetOutput(stderr)
	return 0
}

func main() {
	os.Exit(run(os.Args[1:], os.Stdin, os.Stdout, os.Stderr))
}
