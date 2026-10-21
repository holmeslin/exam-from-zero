package main

// Generate 把 nums 依序送出，送完就關閉（已經寫好了）。
func Generate(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

// Square 是 pipeline 的一個階段：把每個收到的數字平方後送出，輸入讀完就關閉輸出。
func Square(in <-chan int) <-chan int {
	// TODO: 建立 out、開 goroutine 處理、回傳 out
	return in
}

// OnlyOdd 是 pipeline 的一個階段：只把奇數送出，輸入讀完就關閉輸出。
func OnlyOdd(in <-chan int) <-chan int {
	// TODO: 建立 out、開 goroutine 處理、回傳 out
	return in
}

func main() {}
