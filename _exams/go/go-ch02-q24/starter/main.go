package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	phones := map[string]string{"小明": "0912-345-678", "小華": "0987-654-321"}

	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("要查誰？")
	scanner.Scan()
	name := scanner.Text()

	// TODO: 用 phone, ok := phones[name] 查詢；找不到印「查無此人」並結束，找到印「名字 的電話是 電話」
	_, _ = phones, name
}
