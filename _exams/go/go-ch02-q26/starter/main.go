package main

import "fmt"

func main() {
	votes := []string{"海邊", "山上", "海邊", "遊樂園", "海邊", "山上"}
	counts := map[string]int{}
	// TODO: 走訪 votes 統計票數
	_ = votes

	best := ""
	bestCount := 0
	// TODO: 走訪 counts，找出最高票的地點和票數
	fmt.Println("最高票：", best, bestCount, "票")

	// TODO: 用 delete 刪掉「遊樂園」
	fmt.Println("剩下", len(counts), "個選項")
}
