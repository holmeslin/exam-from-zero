package main

import (
	"context"
	"fmt"
	"time"
)

func Fetch(parent context.Context, timeout time.Duration, fn func(ctx context.Context) (string, error)) (string, error) {
	ctx, cancel := context.WithTimeout(parent, timeout)
	defer cancel()

	s, err := fn(ctx)
	if err != nil {
		return "", fmt.Errorf("查詢失敗: %w", err)
	}
	return s, nil
}

func main() {}
