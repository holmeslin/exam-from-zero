package main

import (
	"fmt"
	"strconv"
)

// ParseScore 把字串轉成 0～100 的分數。
func ParseScore(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("讀取分數失敗：%w", err)
	}
	if n < 0 || n > 100 {
		return 0, fmt.Errorf("分數 %d 超出範圍", n)
	}
	return n, nil
}

func main() {}
