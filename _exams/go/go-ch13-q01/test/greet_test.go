package main

import (
	"slices"
	"testing"
)

func TestGreet(t *testing.T) {
	cases := []struct {
		args []string
		want []string
	}{
		{[]string{"./greet"}, []string{"用法：greet <名字>..."}},
		{[]string{"./greet", "Andy"}, []string{"哈囉，Andy"}},
		{[]string{"./greet", "小明", "王 大明"}, []string{"哈囉，小明", "哈囉，王 大明"}},
	}
	for _, c := range cases {
		if got := Greet(c.args); !slices.Equal(got, c.want) {
			t.Errorf("Greet(%q) = %q，want %q", c.args, got, c.want)
		}
	}
}
