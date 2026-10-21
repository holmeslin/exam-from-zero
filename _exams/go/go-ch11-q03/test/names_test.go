package main

import (
	"slices"
	"testing"
)

type item struct {
	ID    int    `json:"id"`
	Title string `json:"title,omitempty" db:"title"`
	Note  string `json:",omitempty"`
	Price float64
}

type user struct {
	Name  string `validate:"required" json:"user_name"`
	Email string
}

func TestJSONNames(t *testing.T) {
	if got, want := JSONNames(item{}), []string{"id", "title", "Note", "Price"}; !slices.Equal(got, want) {
		t.Errorf("JSONNames(item{}) = %q, want %q", got, want)
	}
	if got, want := JSONNames(user{}), []string{"user_name", "Email"}; !slices.Equal(got, want) {
		t.Errorf("JSONNames(user{}) = %q, want %q", got, want)
	}
}
