package main

import "context"

func Produce(ctx context.Context, out chan<- int) error {
	for i := 1; ; i++ {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case out <- i:
		}
	}
}

func main() {}
