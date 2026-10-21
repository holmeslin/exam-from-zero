package main

import (
	"context"
	"time"
)

// Fetch 從 parent 衍生出一個時限為 timeout 的 context，用它呼叫 fn。
// fn 回傳錯誤時，包成 "查詢失敗: <原本的錯誤>" 再回傳（要保留原錯誤，讓 errors.Is 認得出來）。
// Fetch 回傳前，要確保衍生出來的 context 已經被取消、資源已釋放。
func Fetch(parent context.Context, timeout time.Duration, fn func(ctx context.Context) (string, error)) (string, error) {
	// TODO: WithTimeout、defer cancel()、用 %w 包錯誤
	return fn(parent)
}

func main() {}
