package main

import "fmt"

type Color int

const (
	Red Color = iota
	Green
	Blue
)

// TODO: 幫 Color 加上 String() 方法：Red →「紅」、Green →「綠」、Blue →「藍」，其他 →「未知」

func main() {
	fmt.Println(Red, Blue)
	fmt.Printf("%v %d\n", Green, Green)
	fmt.Println([]Color{Blue, Red, Color(7)})
}
