package main

import "fmt"

func report(stock map[string]int, item string) {
	if n, ok := stock[item]; !ok {
		fmt.Println("沒有", item, "這項商品")
	} else if n == 0 {
		fmt.Println(item, "已售完")
	} else {
		fmt.Println(item, "還有", n, "個")
	}
}

func main() {
	stock := map[string]int{"鉛筆": 12, "橡皮擦": 0}
	report(stock, "鉛筆")
	report(stock, "橡皮擦")
	report(stock, "尺")
}
