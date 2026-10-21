package main

import "iter"

type Stack struct {
	items []int
}

func (s *Stack) Push(v int) {
	s.items = append(s.items, v)
}

// All 從最上面（最後 Push 的）往下交出「位置, 值」，最上面的位置是 0。
func (s *Stack) All() iter.Seq2[int, int] {
	return func(yield func(int, int) bool) {
		pos := 0
		for i := len(s.items) - 1; i >= 0; i-- {
			if !yield(pos, s.items[i]) {
				return
			}
			pos++
		}
	}
}

func main() {}
