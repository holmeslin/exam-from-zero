package main

import "context"

// TODO: 定義一個未匯出的 key 型別和一個 key 常數

// WithID 回傳一個帶著請求編號 id 的新 context。
func WithID(ctx context.Context, id string) context.Context {
	// TODO
	return ctx
}

// IDFrom 取出請求編號；沒有的話回傳 "", false。
func IDFrom(ctx context.Context) (string, bool) {
	// TODO
	return "", false
}

func main() {}
