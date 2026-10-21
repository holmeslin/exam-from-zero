package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("請輸入你的年齡：")
	scanner.Scan()
	line := scanner.Text()
	age, err := strconv.Atoi(line)
	if err != nil {
		fmt.Println("請輸入整數")
		return
	}
	fmt.Println("10 年後你", age+10, "歲")
}
