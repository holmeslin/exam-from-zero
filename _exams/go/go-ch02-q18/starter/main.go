package main

import "fmt"

// addBonus 把每個分數都加上 bonus，不回傳。
func addBonus(scores []int, bonus int) {
	// TODO
}

// addScore 在尾端加一個分數，回傳新的切片。
func addScore(scores []int, s int) []int {
	// TODO
	return scores
}

func main() {
	scores := []int{70, 80}
	scores = addScore(scores, 90)
	addBonus(scores, 5)
	fmt.Println(scores)
}
