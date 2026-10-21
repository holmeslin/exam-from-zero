package main

import "fmt"

func main() {
	item := "咖啡"
	count := 3
	price := 65
	paid := 200
	total := count * price

	fmt.Printf("品項：%s\n", item)
	// TODO: 用 fmt.Printf 印出數量、總價、找零、平均每杯（%.2f）
	_, _ = paid, total
}
