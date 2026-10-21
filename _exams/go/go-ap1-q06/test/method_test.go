package main

import "testing"

func TestAdderOf(t *testing.T) {
	var c Counter
	add := AdderOf(&c)
	for _, n := range []int{1, 2, 3, 4} {
		add(n)
	}
	if c.total != 10 {
		t.Errorf("呼叫 AdderOf(&c) 回傳的函式加了 1、2、3、4 之後，c.total = %d, want 10", c.total)
	}
}

func TestAddExpr(t *testing.T) {
	add := AddExpr()
	var a, b Counter
	add(&a, 5)
	add(&a, 7)
	add(&b, 1)
	if a.total != 12 || b.total != 1 {
		t.Errorf("用 AddExpr() 對 a 加 5、7，對 b 加 1 之後，a.total = %d, b.total = %d; want 12, 1", a.total, b.total)
	}
}
