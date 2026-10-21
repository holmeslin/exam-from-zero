package main

import "testing"

func TestTooHotError(t *testing.T) {
	for temp, want := range map[int]string{40: "溫度 40 度太熱了", 38: "溫度 38 度太熱了"} {
		var err error = TooHotError{Temp: temp}
		if got := err.Error(); got != want {
			t.Errorf("TooHotError{Temp: %d}.Error() = %q, want %q", temp, got, want)
		}
	}
}
