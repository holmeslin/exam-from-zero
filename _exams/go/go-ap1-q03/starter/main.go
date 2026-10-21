package main

import "fmt"

func main() {
	seats := [][]string{
		{"A", "B", "C"},
		{"D", "", "F"},
		{"", "H", "I"},
	}

	// 這段只想印出「第一個」空位，現在卻印了兩個，請修正
	for row := range seats {
		for col := range seats[row] {
			if seats[row][col] == "" {
				fmt.Println("空位在", row, col)
				break
			}
		}
	}
	// 迴圈結束後印出「搜尋結束」
}
