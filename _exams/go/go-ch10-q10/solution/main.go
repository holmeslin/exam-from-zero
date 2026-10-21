package main

import (
	"context"
	"time"
)

func AuditContext(reqCtx context.Context, limit time.Duration) (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.WithoutCancel(reqCtx), limit)
}

func main() {}
