package main

import "context"

func CloseOnCancel(ctx context.Context, ch chan struct{}) (stop func() bool) {
	return context.AfterFunc(ctx, func() { close(ch) })
}

func main() {}
