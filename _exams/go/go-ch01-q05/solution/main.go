package main

import "fmt"

func main() {
	height := 125
	canRide := height >= 120
	fmt.Println("可以搭乘：", canRide)
	fmt.Println("剛好 120 公分：", height == 120)
}
