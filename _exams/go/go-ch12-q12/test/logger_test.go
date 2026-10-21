package main

import (
	"strings"
	"testing"
)

func TestNewLogger(t *testing.T) {
	var sb strings.Builder
	logger := NewLogger(&sb)
	reqLog := logger.With("request_id", "r42")
	reqLog.Debug("查詢資料庫", "table", "orders")
	reqLog.Warn("回應很慢", "ms", 1250)
	logger.Info("服務關閉")

	want := "level=DEBUG msg=查詢資料庫 request_id=r42 table=orders\n" +
		"level=WARN msg=回應很慢 request_id=r42 ms=1250\n" +
		"level=INFO msg=服務關閉\n"
	if got := sb.String(); got != want {
		t.Errorf("日誌輸出 =\n%s\nwant\n%s", got, want)
	}
}
