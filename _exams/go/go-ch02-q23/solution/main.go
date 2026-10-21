package main

import "fmt"

func main() {
	prices := map[string]int{"紅茶": 30, "綠茶": 30, "奶茶": 45}
	prices["咖啡"] = 60
	prices["奶茶"] = 50

	total := prices["紅茶"] + prices["奶茶"]*2 + prices["咖啡"]
	fmt.Println("總價：", total)
	fmt.Println("價目表共", len(prices), "項")
	fmt.Println("可可：", prices["可可"])
}
