package main

func report(stock map[string]int, item string) {
	// TODO: 用 if 的初始化敘述查庫存，分「沒有這項商品」「已售完」「還有幾個」三種情況印出
}

func main() {
	stock := map[string]int{"鉛筆": 12, "橡皮擦": 0}
	report(stock, "鉛筆")
	report(stock, "橡皮擦")
	report(stock, "尺")
}
