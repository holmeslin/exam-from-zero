package main

import "testing"

func TestDogHello(t *testing.T) {
	d := Dog{Animal: Animal{Name: "Lucky"}, Breed: "柴犬"}
	if got, want := d.Hello(), "汪！我是 Lucky，品種是 柴犬"; got != want {
		t.Errorf("d.Hello() = %q, want %q", got, want)
	}
	if got, want := d.Animal.Hello(), "我是 Lucky"; got != want {
		t.Errorf("d.Animal.Hello() = %q, want %q（Animal 的 Hello 不該被改掉）", got, want)
	}
	d.Name = "Max"
	if got, want := d.Hello(), "汪！我是 Max，品種是 柴犬"; got != want {
		t.Errorf("d.Name = \"Max\" 之後 d.Hello() = %q, want %q", got, want)
	}
}
