package main

import "fmt"

func main() {
	ids := []int{7, 42, 315}
	names := []string{"Andy", "Bob", "Cindy"}
	scores := []float64{92.5, 8, 77.25}
	for i := range ids {
		fmt.Printf("A%04d %-6s|%7.2f\n", ids[i], names[i], scores[i])
	}
}
