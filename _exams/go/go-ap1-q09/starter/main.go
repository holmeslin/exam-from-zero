package main

// Clone 回傳一個和 s 內容相同、但不共用底層陣列的新切片。
func Clone(s []int) []int {
	// TODO：現在只複製了 header，兩者還是共用同一個底層陣列
	t := s
	return t
}

func main() {}
