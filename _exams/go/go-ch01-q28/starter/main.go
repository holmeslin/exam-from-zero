package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("請輸入月份：")
	scanner.Scan()
	line := scanner.Text()
	month, err := strconv.Atoi(line)
	// TODO: 輸入不是整數時印出「請輸入整數」，再用 switch 印出季節
	fmt.Println(month, err)
}
