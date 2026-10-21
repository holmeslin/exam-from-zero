package main

type Celsius float64
type Fahrenheit float64

func (c Celsius) ToFahrenheit() Fahrenheit {
	return Fahrenheit(c*9/5 + 32)
}

func (c Celsius) IsFreezing() bool {
	return c <= 0
}

func main() {}
