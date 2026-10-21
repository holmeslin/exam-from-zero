package main

import "testing"

func TestCanDelete(t *testing.T) {
	cases := []struct {
		name string
		u    *User
		want bool
	}{
		{"nil", nil, false},
		{"admin", &User{Name: "Alice", Admin: true}, true},
		{"not admin", &User{Name: "Bob"}, false},
	}
	for _, c := range cases {
		if got := CanDelete(c.u); got != c.want {
			t.Errorf("CanDelete(%s) = %v, want %v", c.name, got, c.want)
		}
	}
}

func TestFirstIs(t *testing.T) {
	cases := []struct {
		names []string
		want  string
		exp   bool
	}{
		{nil, "Andy", false},
		{[]string{}, "Andy", false},
		{[]string{"Andy", "Bob"}, "Andy", true},
		{[]string{"Bob", "Andy"}, "Andy", false},
	}
	for _, c := range cases {
		if got := FirstIs(c.names, c.want); got != c.exp {
			t.Errorf("FirstIs(%q, %q) = %v, want %v", c.names, c.want, got, c.exp)
		}
	}
}
