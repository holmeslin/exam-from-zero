package main

import "testing"

func TestAddN(t *testing.T) {
	c := &Counter{}
	AddN(c, 3)
	if c.Count != 3 {
		t.Errorf("AddN(&Counter{}, 3) 之後 Count = %d, want 3", c.Count)
	}
	AddN(c, 2)
	if c.Count != 5 {
		t.Errorf("再 AddN(c, 2) 之後 Count = %d, want 5", c.Count)
	}
}
