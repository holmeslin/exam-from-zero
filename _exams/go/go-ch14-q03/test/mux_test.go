package main

import (
	"net/http/httptest"
	"testing"
)

func TestNewMux(t *testing.T) {
	tests := []struct {
		method, target string
		wantCode       int
		wantBody       string
	}{
		{"GET", "/users/42", 200, "user 42\n"},
		{"GET", "/users/me", 200, "me\n"},
		{"GET", "/files/docs/a.txt", 200, "file docs/a.txt\n"},
		{"GET", "/users/42/extra", 404, ""},
		{"DELETE", "/users/42", 405, ""},
	}
	mux := NewMux()
	for _, tt := range tests {
		req := httptest.NewRequest(tt.method, tt.target, nil)
		rec := httptest.NewRecorder()
		mux.ServeHTTP(rec, req)
		if rec.Code != tt.wantCode {
			t.Errorf("%s %s 的狀態碼 = %d，想要 %d", tt.method, tt.target, rec.Code, tt.wantCode)
			continue
		}
		if tt.wantBody != "" && rec.Body.String() != tt.wantBody {
			t.Errorf("%s %s 的內容 = %q，想要 %q", tt.method, tt.target, rec.Body.String(), tt.wantBody)
		}
	}
}
