package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("請輸入 email：")
	scanner.Scan()
	email := scanner.Text()
	email = strings.TrimSpace(email)
	email = strings.ToLower(email)
	if !strings.Contains(email, "@") {
		fmt.Println("格式不對")
		return
	}
	fmt.Println(email)
	fmt.Println("是 .tw 結尾：", strings.HasSuffix(email, ".tw"))
}
