package main

import "context"

// CloseOnCancel 登記：ctx 被取消後就 close(ch)。
// 回傳的 stop 用來撤銷登記，回傳 true 代表成功攔下（ch 不會被關閉）。
func CloseOnCancel(ctx context.Context, ch chan struct{}) (stop func() bool) {
	// TODO: 用 context.AfterFunc
	return func() bool { return false }
}

func main() {}
