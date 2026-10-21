package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("請輸入停車時數：")
	scanner.Scan()
	line := scanner.Text()
	hours, err := strconv.Atoi(line)
	// TODO: 先處理 err 和不合理的時數，再印出停車費
	fmt.Println(hours, err)
}
