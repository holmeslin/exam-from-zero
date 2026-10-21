package main

import (
	"fmt"
	"sync"
)

func main() {
	nums := []int{1, 2, 3, 4, 5}
	squares := make([]int, len(nums))

	var wg sync.WaitGroup
	for i, n := range nums {
		wg.Go(func() {
			squares[i] = n * n
		})
	}
	wg.Wait()

	fmt.Println(squares)
}
