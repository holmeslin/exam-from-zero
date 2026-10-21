package main

import "testing"

type user struct {
	Name  string `validate:"required"`
	Email string `validate:"required"`
	Age   int
}

type product struct {
	Title string  `validate:"required"`
	Price float64 `validate:"required"`
	Tags  []string
}

func errText(err error) string {
	if err == nil {
		return "<nil>"
	}
	return err.Error()
}

func TestValidate(t *testing.T) {
	cases := []struct {
		in   any
		want string
	}{
		{user{Name: "Andy", Email: "andy@example.com"}, "<nil>"},
		{user{Age: 30}, "Name 是必填欄位\nEmail 是必填欄位"},
		{product{Title: "鍵盤"}, "Price 是必填欄位"},
		{product{Title: "滑鼠", Price: 390}, "<nil>"},
		{42, "只能檢查 struct"},
		{"hi", "只能檢查 struct"},
	}
	for _, c := range cases {
		if got := errText(Validate(c.in)); got != c.want {
			t.Errorf("Validate(%#v) = %q, want %q", c.in, got, c.want)
		}
	}
}
