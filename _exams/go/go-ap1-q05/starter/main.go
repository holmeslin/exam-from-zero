package main

import (
	"fmt"
	"strconv"
)

// ParseAll 把 a、b 轉成整數後相加；b 是空字串時只轉 a。
// 任何一個轉換失敗都要回傳錯誤。
// 這個版本有 bug：ParseAll("10", "abc") 竟然回傳 10 和 nil。
func ParseAll(a, b string) (int, error) {
	var err error
	x, err := strconv.Atoi(a)
	if err != nil {
		return 0, err
	}
	if b != "" {
		y, err := strconv.Atoi(b)
		if err == nil {
			x += y
		}
	}
	return x, err
}

func main() {
	n, err := ParseAll("10", "abc")
	fmt.Println(n, err)
}
