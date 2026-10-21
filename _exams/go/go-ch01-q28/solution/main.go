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
	if err != nil {
		fmt.Println("請輸入整數")
		return
	}

	switch month {
	case 3, 4, 5:
		fmt.Println("春天")
	case 6, 7, 8:
		fmt.Println("夏天")
	case 9, 10, 11:
		fmt.Println("秋天")
	case 12, 1, 2:
		fmt.Println("冬天")
	default:
		fmt.Println("沒有這個月份")
	}
}
