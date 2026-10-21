package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	// TODO：用 for scanner.Scan() 讀完所有行
	//   空白行略過；不是整數的行把警告寫到 os.Stderr 後略過
	//   最後檢查 scanner.Err()，再把「N 個數字，總和 S」寫到標準輸出
	_ = scanner
	fmt.Println()
}
