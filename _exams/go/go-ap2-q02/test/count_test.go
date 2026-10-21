package main

import "testing"

func TestSafeCount(t *testing.T) {
	cases := [][2]int{{1, 10}, {8, 1000}, {50, 2000}}
	for _, c := range cases {
		for range 3 {
			if got, want := SafeCount(c[0], c[1]), c[0]*c[1]; got != want {
				t.Fatalf("SafeCount(%d, %d) = %d, want %d（有沒有等所有 goroutine 結束？count 有沒有上鎖？）", c[0], c[1], got, want)
			}
		}
	}
}
