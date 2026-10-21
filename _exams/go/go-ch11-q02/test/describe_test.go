package main

import "testing"

type Age int

type Name string

func TestDescribe(t *testing.T) {
	cases := []struct {
		in   any
		want string
	}{
		{41, "整數 41"},
		{Age(30), "整數 30"},
		{"hello", "字串長度 5"},
		{Name("Go"), "字串長度 2"},
		{[]float64{1.5, 2.5}, "切片長度 2"},
		{[]string{}, "切片長度 0"},
		{true, "不處理 bool"},
		{map[string]int{"a": 1}, "不處理 map"},
	}
	for _, c := range cases {
		if got := Describe(c.in); got != c.want {
			t.Errorf("Describe(%#v) = %q, want %q", c.in, got, c.want)
		}
	}
}
