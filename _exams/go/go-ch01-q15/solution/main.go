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
	if err != nil {
		fmt.Println("請輸入整數")
		return
	}

	if hours <= 0 {
		fmt.Println("時數要大於 0")
	} else if hours <= 2 {
		fmt.Println("停車費：", hours*30, "元")
	} else {
		fmt.Println("停車費：", 60+(hours-2)*50, "元")
	}
}
