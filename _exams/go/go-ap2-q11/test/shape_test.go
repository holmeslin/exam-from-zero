package main

import (
	"math"
	"testing"
)

func TestTotalArea(t *testing.T) {
	shapes := []Shape{Rect{W: 3, H: 4}, Circle{R: 1}, Rect{W: 1, H: 1}}
	if got, want := TotalArea(shapes), 16.14; math.Abs(got-want) > 1e-9 {
		t.Errorf("TotalArea(Rect{3,4}, Circle{1}, Rect{1,1}) = %v, want %v", got, want)
	}
	if got := TotalArea(nil); got != 0 {
		t.Errorf("TotalArea(nil) = %v, want 0", got)
	}
	var s Shape = Circle{R: 2}
	if got, want := s.Area(), 12.56; math.Abs(got-want) > 1e-9 {
		t.Errorf("Circle{R: 2}.Area() = %v, want %v", got, want)
	}
}
