package main

import "testing"

func TestTextkit(t *testing.T) {
	cases := []struct {
		args []string
		want string
	}{
		{[]string{"upper", "hello", "go"}, "HELLO GO"},
		{[]string{"repeat", "-n", "3", "-sep", " | ", "咚"}, "咚 | 咚 | 咚"},
		{[]string{"repeat", "哈"}, "哈 哈"},
		{[]string{"repeat", "-n=1", "a", "b"}, "a b"},
	}
	for _, c := range cases {
		got, err := Textkit(c.args)
		if err != nil {
			t.Errorf("Textkit(%q) 回傳錯誤：%v", c.args, err)
			continue
		}
		if got != c.want {
			t.Errorf("Textkit(%q) = %q，want %q", c.args, got, c.want)
		}
	}
}

func TestTextkitErrors(t *testing.T) {
	for _, args := range [][]string{
		{},
		{"lower", "ABC"},
		{"upper", "-n", "3", "a"}, // upper 沒有 -n 選項
		{"repeat", "-n", "abc", "x"},
	} {
		if got, err := Textkit(args); err == nil {
			t.Errorf("Textkit(%q) 應該回傳錯誤，卻得到 (%q, nil)", args, got)
		}
	}
}
