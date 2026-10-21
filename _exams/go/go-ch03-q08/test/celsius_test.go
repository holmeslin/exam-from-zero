package main

import "testing"

func TestToFahrenheit(t *testing.T) {
	for c, want := range map[Celsius]Fahrenheit{0: 32, 100: 212, -40: -40, 30: 86} {
		if got := c.ToFahrenheit(); got != want {
			t.Errorf("Celsius(%v).ToFahrenheit() = %v, want %v", c, got, want)
		}
	}
}

func TestIsFreezing(t *testing.T) {
	for c, want := range map[Celsius]bool{-5: true, 0: true, 0.5: false, 25: false} {
		if got := c.IsFreezing(); got != want {
			t.Errorf("Celsius(%v).IsFreezing() = %v, want %v", c, got, want)
		}
	}
}
