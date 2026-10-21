package main

import "testing"

func TestFindMissing(t *testing.T) {
	for _, name := range []string{"small", ""} {
		if s := Find(name); s != nil {
			t.Errorf("Find(%q) == nil 應該是 true，但介面裡裝了 %T（值是 %v）", name, s, s)
		}
	}
}

func TestFindFound(t *testing.T) {
	cases := map[string]float64{"big": 100, "long": 40}
	for name, want := range cases {
		s := Find(name)
		if s == nil {
			t.Errorf("Find(%q) = nil，應該要找到", name)
			continue
		}
		if got := s.Area(); got != want {
			t.Errorf("Find(%q).Area() = %v, want %v", name, got, want)
		}
	}
}
