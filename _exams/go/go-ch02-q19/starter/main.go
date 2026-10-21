package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("請輸入 n：")
	scanner.Scan()
	line := scanner.Text()
	// TODO: 用 strconv.Atoi 把 line 轉成整數，不是整數或小於 1 時印出提示並結束
	// TODO: 用 make([]int, n) 建立切片，依序放入 1 到 n 的平方，最後印出切片
	_ = line
}
