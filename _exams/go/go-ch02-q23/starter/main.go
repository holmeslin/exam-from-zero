package main

import "fmt"

func main() {
	prices := map[string]int{"紅茶": 30, "綠茶": 30, "奶茶": 45}
	// TODO: 新增咖啡 60、奶茶漲價為 50
	// TODO: 從 prices 查價，算出一杯紅茶、兩杯奶茶、一杯咖啡的總價
	total := 0
	fmt.Println("總價：", total)
	fmt.Println("價目表共", len(prices), "項")
	// TODO: 印出查詢「可可」得到的值
}
