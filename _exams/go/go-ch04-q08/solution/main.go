package main

import "fmt"

type Color int

const (
	Red Color = iota
	Green
	Blue
)

func (c Color) String() string {
	switch c {
	case Red:
		return "紅"
	case Green:
		return "綠"
	case Blue:
		return "藍"
	}
	return "未知"
}

func main() {
	fmt.Println(Red, Blue)
	fmt.Printf("%v %d\n", Green, Green)
	fmt.Println([]Color{Blue, Red, Color(7)})
}
