package main

import (
	"maps"
	"testing"
)

func TestParsePairs(t *testing.T) {
	cases := []struct {
		in   string
		want map[string]string
	}{
		{"name=Andy;city=Taipei;lang=Go", map[string]string{"name": "Andy", "city": "Taipei", "lang": "Go"}},
		{"a=1;broken;b=", map[string]string{"a": "1", "b": ""}},
		{"expr=x=y+1", map[string]string{"expr": "x=y+1"}},
		{"", map[string]string{}},
	}
	for _, c := range cases {
		if got := ParsePairs([]byte(c.in)); !maps.Equal(got, c.want) {
			t.Errorf("ParsePairs(%q) = %v, want %v", c.in, got, c.want)
		}
	}
}
