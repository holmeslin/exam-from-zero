package main

import "context"

type ctxKey int

const idKey ctxKey = 0

func WithID(ctx context.Context, id string) context.Context {
	return context.WithValue(ctx, idKey, id)
}

func IDFrom(ctx context.Context) (string, bool) {
	id, ok := ctx.Value(idKey).(string)
	return id, ok
}

func main() {}
