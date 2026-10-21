package main

import (
	"context"
	"errors"
)

func Classify(err error) string {
	switch {
	case err == nil:
		return "成功"
	case errors.Is(err, context.DeadlineExceeded):
		return "逾時"
	case errors.Is(err, context.Canceled):
		return "取消"
	default:
		return "錯誤"
	}
}

func main() {}
