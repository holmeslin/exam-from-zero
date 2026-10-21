package main

import "testing"

func TestPopClearsSlot(t *testing.T) {
	var s Stack
	a, b, c := &Image{Name: "a"}, &Image{Name: "b"}, &Image{Name: "c"}
	s.Push(a)
	s.Push(b)
	s.Push(c)
	if got := s.Pop(); got != c {
		t.Fatalf("第一次 Pop() = %v, want c", got)
	}
	if got := s.Pop(); got != b {
		t.Fatalf("第二次 Pop() = %v, want b", got)
	}
	if len(s.items) != 1 || s.items[0] != a {
		t.Fatalf("Pop 兩次後 items = %v, want [a]", s.items)
	}
	backing := s.items[:3]
	for i := 1; i < 3; i++ {
		if backing[i] != nil {
			t.Errorf("底層陣列第 %d 格還留著 %q，GC 會以為它還在用；Pop 時要設成 nil", i, backing[i].Name)
		}
	}
	s.Pop()
	if got := s.Pop(); got != nil {
		t.Errorf("空的 Stack Pop() = %v, want nil", got)
	}
}
