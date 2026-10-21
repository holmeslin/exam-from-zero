package main

import "testing"

func TestDescribe(t *testing.T) {
	cases := []struct {
		in   any
		want string
	}{
		{21, "整數 42"},
		{0, "整數 0"},
		{"Go", "字串 2"},
		{"", "字串 0"},
		{true, "布林 false"},
		{false, "布林 true"},
		{nil, "沒有東西"},
		{3.14, "其他 float64"},
		{[]int{1}, "其他 []int"},
	}
	for _, c := range cases {
		if got := Describe(c.in); got != c.want {
			t.Errorf("Describe(%#v) = %q, want %q", c.in, got, c.want)
		}
	}
}
