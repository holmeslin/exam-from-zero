package main

import (
	"fmt"
	"strconv"
)

func ParseAll(a, b string) (int, error) {
	x, err := strconv.Atoi(a)
	if err != nil {
		return 0, err
	}
	if b != "" {
		var y int
		y, err = strconv.Atoi(b)
		if err == nil {
			x += y
		}
	}
	return x, err
}

func main() {
	n, err := ParseAll("10", "abc")
	fmt.Println(n, err)
}
