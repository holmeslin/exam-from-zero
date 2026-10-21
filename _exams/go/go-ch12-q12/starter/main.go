package main

import (
	"io"
	"log/slog"
)

// NewLogger 回傳一個寫到 w、輸出 key=value 格式的 Logger：
// Debug 以上都要輸出，而且不輸出時間欄位。
func NewLogger(w io.Writer) *slog.Logger {
	opts := &slog.HandlerOptions{
		// TODO: 調整最低層級，並用 ReplaceAttr 拿掉時間欄位
	}
	return slog.New(slog.NewTextHandler(w, opts))
}

func main() {}
