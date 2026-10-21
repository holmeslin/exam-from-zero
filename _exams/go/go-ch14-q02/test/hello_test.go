package main

import (
	"net/http/httptest"
	"testing"
)

func TestHello(t *testing.T) {
	tests := []struct {
		method, target, want string
	}{
		{"GET", "/", "哈囉，世界！\n你用 GET 方法請求了 /\n"},
		{"GET", "/abc?name=小美", "哈囉，小美！\n你用 GET 方法請求了 /abc\n"},
		{"POST", "/x", "哈囉，世界！\n你用 POST 方法請求了 /x\n"},
	}
	for _, tt := range tests {
		req := httptest.NewRequest(tt.method, tt.target, nil)
		rec := httptest.NewRecorder()
		Hello(rec, req)
		if got := rec.Body.String(); got != tt.want {
			t.Errorf("%s %s 的內容 = %q，想要 %q", tt.method, tt.target, got, tt.want)
		}
	}
}
