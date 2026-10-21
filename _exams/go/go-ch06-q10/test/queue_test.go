package main

import "testing"

func TestQueueStrings(t *testing.T) {
	var q Queue[string]
	q.Push("小明")
	q.Push("小美")
	q.Push("阿哲")
	if got := q.Len(); got != 3 {
		t.Fatalf("放入 3 個後 Len() = %d, want 3", got)
	}
	for _, want := range []string{"小明", "小美", "阿哲"} {
		got, ok := q.Pop()
		if !ok || got != want {
			t.Fatalf("Pop() = (%q, %v), want (%q, true)", got, ok, want)
		}
	}
	got, ok := q.Pop()
	if ok || got != "" {
		t.Errorf("空佇列 Pop() = (%q, %v), want (\"\", false)", got, ok)
	}
	if got := q.Len(); got != 0 {
		t.Errorf("全部拿完後 Len() = %d, want 0", got)
	}
}

func TestQueueInts(t *testing.T) {
	var q Queue[int]
	q.Push(1)
	q.Push(2)
	if v, _ := q.Pop(); v != 1 {
		t.Errorf("Pop() = %d, want 1（先放進去的先出來）", v)
	}
	q.Push(3)
	if v, _ := q.Pop(); v != 2 {
		t.Errorf("Pop() = %d, want 2", v)
	}
	if got := q.Len(); got != 1 {
		t.Errorf("Len() = %d, want 1", got)
	}
}
