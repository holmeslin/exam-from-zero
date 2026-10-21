package main

import "testing"

func TestIsLeapYear(t *testing.T) {
	cases := []struct {
		year int
		want bool
	}{{2024, true}, {1900, false}, {2000, true}, {2023, false}, {2100, false}, {2400, true}, {1996, true}}
	for _, c := range cases {
		if got := isLeapYear(c.year); got != c.want {
			t.Errorf("isLeapYear(%d) = %v, want %v", c.year, got, c.want)
		}
	}
}
