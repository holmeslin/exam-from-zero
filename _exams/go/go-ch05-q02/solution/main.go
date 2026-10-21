package main

import "errors"

// SafeDiv 回傳 a / b。b 是 0 時，回傳 0 和訊息為「除數不能是 0」的錯誤。
func SafeDiv(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("除數不能是 0")
	}
	return a / b, nil
}

func main() {}
