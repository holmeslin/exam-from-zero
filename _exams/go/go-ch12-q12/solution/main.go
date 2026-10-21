package main

import (
	"io"
	"log/slog"
)

// NewLogger 回傳一個寫到 w、輸出 key=value 格式的 Logger：
// Debug 以上都要輸出，而且不輸出時間欄位。
func NewLogger(w io.Writer) *slog.Logger {
	opts := &slog.HandlerOptions{
		Level: slog.LevelDebug,
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			if a.Key == slog.TimeKey && len(groups) == 0 {
				return slog.Attr{}
			}
			return a
		},
	}
	return slog.New(slog.NewTextHandler(w, opts))
}

func main() {}
