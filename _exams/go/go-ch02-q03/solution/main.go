package main

import "fmt"

func main() {
	item := "咖啡"
	count := 3
	price := 65
	paid := 200
	total := count * price

	fmt.Printf("品項：%s\n", item)
	fmt.Printf("數量：%d 杯\n", count)
	fmt.Printf("總價：%d 元\n", total)
	fmt.Printf("找零：%d 元\n", paid-total)
	fmt.Printf("平均每杯：%.2f 元\n", float64(total)/float64(count))
}
