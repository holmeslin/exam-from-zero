package main

import "testing"

func TestCheckPickup(t *testing.T) {
	cases := []struct {
		hasID      bool
		code, days int
		want       string
	}{
		{true, 1234, 3, "可以領取"},
		{true, 1234, 7, "可以領取"},
		{false, 1234, 3, "請出示證件"},
		{false, 9999, 10, "請出示證件"},
		{true, 9999, 3, "取件碼錯誤"},
		{true, 9999, 10, "取件碼錯誤"},
		{true, 1234, 10, "已超過保管期限"},
	}
	for _, c := range cases {
		if got := checkPickup(c.hasID, c.code, c.days); got != c.want {
			t.Errorf("checkPickup(%v, %d, %d) = %q, want %q", c.hasID, c.code, c.days, got, c.want)
		}
	}
}
