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

	phone, ok := phones[name]
	if !ok {
		fmt.Println("查無此人")
		return
	}
	fmt.Println(name, "的電話是", phone)
}
