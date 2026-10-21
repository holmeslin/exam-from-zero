package main

// Compose 把好幾個 func(int) int 串成一個新函式：
// 回傳的函式收到 x 後，依序把 x 交給 fs[0]、fs[1]……，前一個的結果是下一個的輸入。
// 沒有傳任何函式時，回傳的函式直接把 x 原封不動傳回。
func Compose(fs ...func(int) int) func(int) int {
	// TODO
	return func(x int) int {
		return 0
	}
}

func main() {}
