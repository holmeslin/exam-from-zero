package main

type Queue[T any] struct {
	items []T
}

func (q *Queue[T]) Push(v T) {
	q.items = append(q.items, v)
}

func (q *Queue[T]) Pop() (T, bool) {
	if len(q.items) == 0 {
		var zero T
		return zero, false
	}
	first := q.items[0]
	q.items = q.items[1:]
	return first, true
}

func (q Queue[T]) Len() int {
	return len(q.items)
}

func main() {}
