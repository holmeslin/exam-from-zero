package main

// Queue 是一個泛型佇列：先放進去的先拿出來（跟堆疊相反）。
// 零值就能直接使用。
type Queue[T any] struct {
	items []T
}

// Push 把 v 放到佇列最後面。
func (q *Queue[T]) Push(v T) {
	// TODO
}

// Pop 拿出並移除最前面的元素；佇列是空的時，回傳 T 的零值和 false。
func (q *Queue[T]) Pop() (T, bool) {
	// TODO
	var zero T
	return zero, false
}

// Len 回傳目前元素數量。
func (q Queue[T]) Len() int {
	// TODO
	return 0
}

func main() {}
