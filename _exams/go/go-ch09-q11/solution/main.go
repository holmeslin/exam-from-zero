package main

import (
	"fmt"
	"sync"
)

// 這支程式會死結，請修好它，讓它印出「總和： 14」。
func main() {
	results := make(chan int)
	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Go(func() {
			results <- i * i
		})
	}
	go func() {
		wg.Wait()
		close(results)
	}()

	total := 0
	for r := range results {
		total += r
	}
	fmt.Println("總和：", total)
}
