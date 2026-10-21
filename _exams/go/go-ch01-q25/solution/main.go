package main

import "fmt"

func main() {
	pieces := 9
	people := 2
	each := float64(pieces) / float64(people)
	fmt.Println("每人", each, "片")
}
