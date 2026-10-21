package main

import (
	"fmt"
	"reflect"
)

type Celsius float64

type Point struct {
	X, Y int
}

func main() {
	values := []any{42, Celsius(36.5), Point{1, 2}, []string{"a"}}
	for _, x := range values {
		t := reflect.TypeOf(x)
		fmt.Println(t, t.Kind())
	}
}
