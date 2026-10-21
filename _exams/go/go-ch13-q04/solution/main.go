package main

import (
	"errors"
	"flag"
	"fmt"
	"io"
	"os"
	"strings"
)

// Textkit 收到的 args 和 os.Args[1:] 一樣：args[0] 是子命令。
//
//	upper            把剩下的字用空白接起來，轉成大寫
//	repeat -n -sep   把剩下的字用空白接起來，重複 n 次（預設 2），中間用 sep 隔開（預設 " "）
//
// 沒給子命令、子命令不認得、選項解析失敗時，回傳錯誤。
func Textkit(args []string) (string, error) {
	if len(args) < 1 {
		return "", errors.New("缺少子命令")
	}
	switch args[0] {
	case "upper":
		fs := flag.NewFlagSet("upper", flag.ContinueOnError)
		fs.SetOutput(io.Discard)
		if err := fs.Parse(args[1:]); err != nil {
			return "", err
		}
		return strings.ToUpper(strings.Join(fs.Args(), " ")), nil
	case "repeat":
		fs := flag.NewFlagSet("repeat", flag.ContinueOnError)
		fs.SetOutput(io.Discard)
		n := fs.Int("n", 2, "重複幾次")
		sep := fs.String("sep", " ", "分隔符號")
		if err := fs.Parse(args[1:]); err != nil {
			return "", err
		}
		text := strings.Join(fs.Args(), " ")
		parts := make([]string, *n)
		for i := range parts {
			parts[i] = text
		}
		return strings.Join(parts, *sep), nil
	default:
		return "", fmt.Errorf("不認得的子命令：%s", args[0])
	}
}

func main() {
	out, err := Textkit(os.Args[1:])
	if err != nil {
		fmt.Fprintln(os.Stderr, "textkit:", err)
		os.Exit(2)
	}
	fmt.Println(out)
}
