package main

import "fmt"

type Score int

func (s Score) String() string {
	return fmt.Sprintf("%d 分", int(s))
}

type Integer interface {
	~int | ~int64
}

func Total[T Integer](nums []T) T {
	var sum T
	for _, n := range nums {
		sum += n
	}
	return sum
}

func main() {
	fmt.Println(Total([]Score{80, 95, 70}))
}
