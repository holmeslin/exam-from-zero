package main

// LastPanic 記錄最近一次被接住的 panic 內容（用 fmt.Sprint 轉成字串）
var LastPanic string

// handlePanic 要被 defer 呼叫：接住 panic，並把內容記到 LastPanic
func handlePanic() {
	// TODO
}

// Divide 回傳 a / b；b 是 0 時不能讓程式當掉，要回傳 0。
func Divide(a, b int) int {
	// TODO：用 defer 安排 handlePanic
	return a / b
}

func main() {}
