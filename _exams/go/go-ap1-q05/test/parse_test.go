package main

import "testing"

func TestParseAllOK(t *testing.T) {
	cases := []struct {
		a, b string
		want int
	}{
		{"10", "5", 15},
		{"7", "", 7},
		{"-3", "3", 0},
	}
	for _, c := range cases {
		got, err := ParseAll(c.a, c.b)
		if err != nil || got != c.want {
			t.Errorf("ParseAll(%q, %q) = %d, %v; want %d, <nil>", c.a, c.b, got, err, c.want)
		}
	}
}

func TestParseAllError(t *testing.T) {
	for _, c := range [][2]string{{"10", "abc"}, {"x", "1"}, {"1", "2.5"}} {
		if _, err := ParseAll(c[0], c[1]); err == nil {
			t.Errorf("ParseAll(%q, %q) 的錯誤是 nil，want 非 nil（轉換失敗的錯誤是不是被內層的 err 吃掉了？）", c[0], c[1])
		}
	}
}
