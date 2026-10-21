package main

// Event 在 64 位元電腦上目前佔 24 個位元組。
// TODO: 只調整欄位順序（不增減欄位、不改型別），讓它變成 16 個位元組。
type Event struct {
	Urgent bool
	ID     int64
	Done   bool
	Code   int32
}

func main() {}
