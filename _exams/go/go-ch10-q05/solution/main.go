package main

import (
	"context"
	"time"
)

func SlowQuery(ctx context.Context, d time.Duration) (string, error) {
	select {
	case <-time.After(d):
		return "完成", nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

func main() {}
