package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Println("請輸入密碼：")
		scanner.Scan()
		password := scanner.Text()
		if password == "gopher" {
			break
		}
		fmt.Println("密碼錯誤，請再試一次")
	}
	fmt.Println("登入成功")
}
