package main

import (
	"database/sql"
	"testing"
)

func TestDescribe(t *testing.T) {
	cases := []struct {
		name  string
		phone sql.NullString
		want  string
	}{
		{"小明", sql.NullString{String: "0912-345-678", Valid: true}, `小明："0912-345-678"`},
		{"小美", sql.NullString{}, "小美：沒填"},
		{"阿華", sql.NullString{String: "", Valid: true}, `阿華：""`},
	}
	for _, c := range cases {
		if got := Describe(c.name, c.phone); got != c.want {
			t.Errorf("Describe(%q, %+v) = %q, want %q", c.name, c.phone, got, c.want)
		}
	}
}
