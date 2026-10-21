package main

import (
	"math"
	"testing"
)

func TestTotalArea(t *testing.T) {
	cases := []struct {
		shapes []Shape
		want   float64
	}{
		{[]Shape{Rect{Width: 3, Height: 4}}, 12},
		{[]Shape{Rect{Width: 3, Height: 4}, Circle{Radius: 2}, Rect{Width: 1, Height: 1}}, 25.56},
		{[]Shape{Circle{Radius: 1}, Circle{Radius: 1}}, 6.28},
		{nil, 0},
	}
	for _, c := range cases {
		if got := TotalArea(c.shapes); math.Abs(got-c.want) > 1e-9 {
			t.Errorf("TotalArea(%v) = %v, want %v", c.shapes, got, c.want)
		}
	}
}
