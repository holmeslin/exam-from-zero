package main

import (
	"fmt"
	"slices"
)

func main() {
	scores := []int{72, 95, 60, 88}
	fmt.Println(scores)

	fmt.Println(slices.Max(scores), slices.Min(scores))
	fmt.Println(slices.Contains(scores, 88))

	sorted := slices.Clone(scores)
	slices.Sort(sorted)
	fmt.Println(sorted)
	fmt.Println(scores)
}
