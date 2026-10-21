package main

import "fmt"

const (
	Spring = iota + 1
	Summer
	Autumn
	Winter
)

func main() {
	season := Autumn
	fmt.Println("Autumn 的編號：", season)
	switch season {
	case Spring:
		fmt.Println("春天")
	case Summer:
		fmt.Println("夏天")
	case Autumn:
		fmt.Println("秋天")
	case Winter:
		fmt.Println("冬天")
	}
}
