package main

import (
	"testing"

	"q/greet"
)

func TestExported(t *testing.T) {
	if got, want := greet.Shout("嗨"), "嗨！！！"; got != want {
		t.Errorf("greet.Shout(%q) = %q，想要 %q", "嗨", got, want)
	}
	p := greet.Person{Name: "小明", Age: 18}
	if p.Age != 18 {
		t.Errorf("Person.Age = %d，想要 18", p.Age)
	}
}
