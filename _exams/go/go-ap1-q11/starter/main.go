package main

import "fmt"

func main() {
	ids := []int{7, 42, 315}
	names := []string{"Andy", "Bob", "Cindy"}
	scores := []float64{92.5, 8, 77.25}
	for i := range ids {
		// TODO：改用 fmt.Printf 控制寬度與對齊
		fmt.Println(ids[i], names[i], scores[i])
	}
}
