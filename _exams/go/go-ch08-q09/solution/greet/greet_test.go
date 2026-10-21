package greet

import "testing"

func TestHello(t *testing.T) {
	tests := []struct {
		name string
		want string
	}{
		{"小明", "你好，小明！"},
		{"Andy", "你好，Andy！"},
		{"", "你好，朋友！"},
	}
	for _, tt := range tests {
		got := Hello(tt.name)
		if got != tt.want {
			t.Errorf("Hello(%q) = %q，想要 %q", tt.name, got, tt.want)
		}
	}
}
