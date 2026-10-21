package main

import (
	"testing"

	"q/greet"
)

func TestHelloHidden(t *testing.T) {
	for name, want := range map[string]string{"小華": "你好，小華！", "": "你好，朋友！", "Go": "你好，Go！"} {
		if got := greet.Hello(name); got != want {
			t.Errorf("greet.Hello(%q) = %q，想要 %q", name, got, want)
		}
	}
}
