package main

import (
	"bufio"
	"errors"
	"flag"
	"fmt"
	"io"
	"os"
	"strings"
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
	flags := flag.NewFlagSet("find", flag.ContinueOnError)
	flags.SetOutput(stderr)
	ignoreCase := flags.Bool("i", false, "不分大小寫")
	lineNum := flags.Bool("n", false, "加上行號")
	flags.Usage = func() {
		fmt.Fprintln(stderr, "用法：find [-i] [-n] <字詞>")
		flags.PrintDefaults()
	}
	if err := flags.Parse(args); err != nil {
		if errors.Is(err, flag.ErrHelp) {
			return 0
		}
		return 2
	}
	if flags.NArg() != 1 {
		flags.Usage()
		return 2
	}

	word := flags.Arg(0)
	if *ignoreCase {
		word = strings.ToLower(word)
	}
	scanner := bufio.NewScanner(stdin)
	lineNo := 0
	for scanner.Scan() {
		lineNo++
		line := scanner.Text()
		target := line
		if *ignoreCase {
			target = strings.ToLower(line)
		}
		if !strings.Contains(target, word) {
			continue
		}
		if *lineNum {
			fmt.Fprintf(stdout, "%d:%s\n", lineNo, line)
		} else {
			fmt.Fprintln(stdout, line)
		}
	}
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(stderr, "find:", err)
		return 1
	}
	return 0
}

func main() {
	os.Exit(run(os.Args[1:], os.Stdin, os.Stdout, os.Stderr))
}
