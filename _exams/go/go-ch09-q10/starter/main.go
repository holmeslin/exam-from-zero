package main

// Merge 把 a、b 兩個 channel 送來的數字全部收齊，由小到大排序後回傳。
// a、b 各自送完都會被關閉；兩個都關閉之後才回傳。
func Merge(a, b <-chan int) []int {
	all := []int{}
	// TODO: 用 select 同時接收 a 和 b，
	// 用 comma-ok 判斷 channel 關了沒，關了就把那個變數設成 nil
	return all
}

func main() {}
