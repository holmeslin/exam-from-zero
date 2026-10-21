package main

type Celsius float64
type Fahrenheit float64

// ToFahrenheit 換算成華氏：F = C*9/5 + 32
func (c Celsius) ToFahrenheit() Fahrenheit {
	// TODO
	return 0
}

// IsFreezing 在 0 度（含）以下時回傳 true
func (c Celsius) IsFreezing() bool {
	// TODO
	return false
}

func main() {}
