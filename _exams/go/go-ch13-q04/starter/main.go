package main

import (
	"fmt"
	"os"
)

// Textkit 收到的 args 和 os.Args[1:] 一樣：args[0] 是子命令。
//
//	upper            把剩下的字用空白接起來，轉成大寫
//	repeat -n -sep   把剩下的字用空白接起來，重複 n 次（預設 2），中間用 sep 隔開（預設 " "）
//
// 沒給子命令、子命令不認得、選項解析失敗時，回傳錯誤。
func Textkit(args []string) (string, error) {
	// TODO：先檢查 len(args)，再用 switch args[0] 分派
	// 每個子命令用 flag.NewFlagSet(名稱, flag.ContinueOnError) 建立自己的選項，解析 args[1:]
	// 可以用 fs.SetOutput(io.Discard) 讓測試時不印說明
	// （記得在 import 加上需要的套件：errors、flag、io、strings……）
	return "", nil
}

func main() {
	out, err := Textkit(os.Args[1:])
	if err != nil {
		fmt.Fprintln(os.Stderr, "textkit:", err)
		os.Exit(2)
	}
	fmt.Println(out)
}
