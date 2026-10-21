package main

import "fmt"

func main() {
	votes := []string{"海邊", "山上", "海邊", "遊樂園", "海邊", "山上"}
	counts := map[string]int{}
	for _, v := range votes {
		counts[v]++
	}

	best := ""
	bestCount := 0
	for place, n := range counts {
		if n > bestCount {
			best = place
			bestCount = n
		}
	}
	fmt.Println("最高票：", best, bestCount, "票")

	delete(counts, "遊樂園")
	fmt.Println("剩下", len(counts), "個選項")
}
