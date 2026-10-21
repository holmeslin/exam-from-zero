package main

import (
	"fmt"
	"maps"
	"slices"
)

func main() {
	price := map[string]int{"紅茶": 30, "綠茶": 25, "奶茶": 45, "咖啡": 60}
	for _, name := range slices.Sorted(maps.Keys(price)) {
		fmt.Println(name, price[name])
	}
}
