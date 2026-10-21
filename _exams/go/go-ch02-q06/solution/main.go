package main

import "fmt"

func isLeapYear(year int) bool {
	return (year%4 == 0 && year%100 != 0) || year%400 == 0
}

func main() {
	fmt.Println(2024, isLeapYear(2024))
	fmt.Println(1900, isLeapYear(1900))
	fmt.Println(2000, isLeapYear(2000))
}
