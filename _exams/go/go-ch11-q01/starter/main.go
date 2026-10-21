package main

import "fmt"

type Celsius float64

type Point struct {
	X, Y int
}

func main() {
	values := []any{42, Celsius(36.5), Point{1, 2}, []string{"a"}}
	for _, x := range values {
		// TODO: 用 reflect.TypeOf 取得型別，印出「型別 種類」
		fmt.Println(x)
	}
}
