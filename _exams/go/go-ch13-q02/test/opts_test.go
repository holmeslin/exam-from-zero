package main

import (
	"slices"
	"testing"
)

func TestParseOpts(t *testing.T) {
	cases := []struct {
		args     []string
		wantName string
		wantN    int
		wantRest []string
	}{
		{[]string{}, "世界", 1, []string{}},
		{[]string{"-name", "小美", "-n", "2", "其他", "參數"}, "小美", 2, []string{"其他", "參數"}},
		{[]string{"-name=Andy", "--n=3"}, "Andy", 3, []string{}},
		{[]string{"a", "-n", "5"}, "世界", 1, []string{"a", "-n", "5"}},
	}
	for _, c := range cases {
		name, n, rest, err := ParseOpts(c.args)
		if err != nil {
			t.Errorf("ParseOpts(%q) 回傳錯誤：%v", c.args, err)
			continue
		}
		if name != c.wantName || n != c.wantN || !slices.Equal(rest, c.wantRest) {
			t.Errorf("ParseOpts(%q) = (%q, %d, %q)，want (%q, %d, %q)", c.args, name, n, rest, c.wantName, c.wantN, c.wantRest)
		}
	}
}

func TestParseOptsBadValue(t *testing.T) {
	if _, _, _, err := ParseOpts([]string{"-n", "abc"}); err == nil {
		t.Errorf(`ParseOpts(["-n" "abc"]) 應該回傳錯誤，卻得到 nil`)
	}
}
