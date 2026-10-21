package main

import "testing"

func TestInsertSQL(t *testing.T) {
	cases := []struct {
		table string
		cols  []string
		want  string
	}{
		{"books", []string{"title", "price"}, "INSERT INTO books (title, price) VALUES (?, ?)"},
		{"notes", []string{"body"}, "INSERT INTO notes (body) VALUES (?)"},
		{"members", []string{"name", "phone", "email"}, "INSERT INTO members (name, phone, email) VALUES (?, ?, ?)"},
	}
	for _, c := range cases {
		if got := InsertSQL(c.table, c.cols); got != c.want {
			t.Errorf("InsertSQL(%q, %q)\n got  %q\n want %q", c.table, c.cols, got, c.want)
		}
	}
}
