package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("請輸入 n：")
	scanner.Scan()
	line := scanner.Text()
	n, err := strconv.Atoi(line)
	if err != nil {
		fmt.Println("請輸入整數")
		return
	}
	if n < 1 {
		fmt.Println("n 要大於 0")
		return
	}

	squares := make([]int, n)
	for i := range n {
		squares[i] = (i + 1) * (i + 1)
	}
	fmt.Println(squares)
}
