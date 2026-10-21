package main

import "fmt"

func isLeapYear(year int) bool {
	// TODO: 能被 4 整除但不能被 100 整除，或能被 400 整除
	return false
}

func main() {
	fmt.Println(2024, isLeapYear(2024))
	fmt.Println(1900, isLeapYear(1900))
	fmt.Println(2000, isLeapYear(2000))
}
