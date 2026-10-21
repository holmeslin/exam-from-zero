package main

// Tags 記錄一組不重複的標籤。
// 目標：var t Tags 宣告完就能直接用，不需要先初始化。
type Tags struct {
	set map[string]bool
}

// Add 加入一個標籤（重複加入不會多算）
func (t *Tags) Add(tag string) {
	t.set[tag] = true
}

// Has 回傳是否有這個標籤
func (t *Tags) Has(tag string) bool {
	return t.set[tag]
}

// Len 回傳不重複標籤的數量
func (t *Tags) Len() int {
	return len(t.set)
}

func main() {}
