package main

// TODO: 定義 Shape 介面，要求一個方法 Area() float64

type Rect struct{ W, H float64 }
type Circle struct{ R float64 }

// TODO: 讓 Rect（W*H）和 Circle（3.14*R*R）都實作 Area

// TotalArea 加總各種形狀的面積。
// TODO: 把參數改成 []Shape，同一個切片可以混著 Rect 和 Circle
func TotalArea(shapes []any) float64 {
	return 0
}

func main() {}
