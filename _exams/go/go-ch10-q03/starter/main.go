package main

import "context"

// Produce 依序送出 1, 2, 3, ... 到 out，直到 ctx 被取消，再回傳 ctx.Err()。
func Produce(ctx context.Context, out chan<- int) error {
	// TODO: 用 for 加 select，同時等 <-ctx.Done() 和 out <- i
	return nil
}

func main() {}
