package main

import "fmt"

func main() {
	seats := [][]string{
		{"A", "B", "C"},
		{"D", "", "F"},
		{"", "H", "I"},
	}

search:
	for row := range seats {
		for col := range seats[row] {
			if seats[row][col] == "" {
				fmt.Println("空位在", row, col)
				break search
			}
		}
	}
	fmt.Println("搜尋結束")
}
