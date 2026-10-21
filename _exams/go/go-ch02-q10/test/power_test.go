package main

import "testing"

func TestPower(t *testing.T) {
	cases := []struct{ base, exp, want int }{{2, 10, 1024}, {3, 4, 81}, {5, 0, 1}, {7, 1, 7}, {10, 3, 1000}}
	for _, c := range cases {
		if got := power(c.base, c.exp); got != c.want {
			t.Errorf("power(%d, %d) = %d, want %d", c.base, c.exp, got, c.want)
		}
	}
}
