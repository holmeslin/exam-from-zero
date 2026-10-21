package main

import "strconv"

// ParseScore 把字串轉成 0～100 的分數。
func ParseScore(s string) (int, error) {
	n, _ := strconv.Atoi(s) // TODO：不要忽略錯誤
	// TODO：檢查範圍
	return n, nil
}

func main() {}
