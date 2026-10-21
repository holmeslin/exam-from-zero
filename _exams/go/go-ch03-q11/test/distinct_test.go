package main

import "testing"

func TestCountDistinct(t *testing.T) {
	cases := []struct {
		in   []Point
		want int
	}{
		{in: nil, want: 0},
		{in: []Point{{X: 1, Y: 2}}, want: 1},
		{in: []Point{{X: 1, Y: 2}, {X: 2, Y: 1}, {X: 1, Y: 2}, {X: 0, Y: 0}, {X: 2, Y: 1}}, want: 3},
	}
	for _, c := range cases {
		if got := CountDistinct(c.in); got != c.want {
			t.Errorf("CountDistinct(%v) = %d, want %d", c.in, got, c.want)
		}
	}
}
