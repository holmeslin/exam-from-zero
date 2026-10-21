package main

type Shape interface {
	Area() float64
}

type Rect struct {
	Width  float64
	Height float64
}

func (r Rect) Area() float64 {
	return r.Width * r.Height
}

type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return 3.14 * c.Radius * c.Radius
}

// TotalArea 回傳 shapes 裡所有形狀的面積總和。
func TotalArea(shapes []Shape) float64 {
	// TODO: 用 for range 把每個形狀的 Area() 加起來
	return 0
}

func main() {}
