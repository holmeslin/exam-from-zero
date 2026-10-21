package main

import (
	"iter"
	"slices"
	"testing"
)

// tracked 交出 vals，並在結束（包含提早結束）時把 *closed 加 1。
func tracked(vals []int, closed *int) iter.Seq[int] {
	return func(yield func(int) bool) {
		defer func() { *closed++ }()
		for _, v := range vals {
			if !yield(v) {
				return
			}
		}
	}
}

func TestEqual(t *testing.T) {
	cases := []struct {
		a, b []int
		want bool
	}{
		{[]int{1, 2, 3}, []int{1, 2, 3}, true},
		{nil, nil, true},
		{[]int{1, 2, 3}, []int{1, 9, 3}, false},
		{[]int{1, 2}, []int{1, 2, 3}, false},
		{[]int{1, 2, 3}, []int{1, 2}, false},
		{[]int{0}, nil, false},
	}
	for _, c := range cases {
		if got := Equal(slices.Values(c.a), slices.Values(c.b)); got != c.want {
			t.Errorf("Equal(%v, %v) = %v，want %v", c.a, c.b, got, c.want)
		}
	}
}

func TestEqualStops(t *testing.T) {
	closed := 0
	a := tracked([]int{1, 2, 3, 4, 5}, &closed)
	b := tracked([]int{1, 7, 3, 4, 5}, &closed)
	if Equal(a, b) {
		t.Errorf("Equal([1 2 3 4 5], [1 7 3 4 5]) = true，want false")
	}
	if closed != 2 {
		t.Errorf("比到不同就提早結束後，兩邊收尾了 %d 個，want 2（記得 defer stop()）", closed)
	}
}
