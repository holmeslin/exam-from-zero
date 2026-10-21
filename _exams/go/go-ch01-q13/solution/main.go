package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("你叫什麼名字？")
	scanner.Scan()
	name := scanner.Text()
	fmt.Println("你最喜歡吃什麼？")
	scanner.Scan()
	food := scanner.Text()
	fmt.Println(name, "最喜歡吃", food)
}
