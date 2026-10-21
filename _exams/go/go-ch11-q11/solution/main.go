package main

// Event 在 64 位元電腦上目前佔 24 個位元組。
// 大欄位放前面，兩個 bool 擠在一起，就不用補那麼多空白。
type Event struct {
	ID     int64
	Code   int32
	Urgent bool
	Done   bool
}

func main() {}
