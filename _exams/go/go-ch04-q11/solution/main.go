package main

type Shape interface {
	Area() float64
}

type Rect struct {
	Width  float64
	Height float64
}

func (r *Rect) Area() float64 {
	return r.Width * r.Height
}

func findRect(name string) *Rect {
	if name == "big" {
		return &Rect{Width: 10, Height: 10}
	}
	if name == "long" {
		return &Rect{Width: 20, Height: 2}
	}
	return nil
}

// Find 找不到時要回傳 nil，讓呼叫端可以用 s == nil 判斷。
func Find(name string) Shape {
	r := findRect(name)
	if r == nil {
		return nil
	}
	return r
}

func main() {}
