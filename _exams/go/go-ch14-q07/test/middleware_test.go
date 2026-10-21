package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRequireToken(t *testing.T) {
	tests := []struct {
		token    string
		wantCode int
		wantBody string
		wantCall bool
	}{
		{"secret", 200, "後台\n", true},
		{"", 401, "unauthorized\n", false},
		{"wrong", 401, "unauthorized\n", false},
	}
	for _, tt := range tests {
		called := false
		inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			called = true
			fmt.Fprintln(w, "後台")
		})
		req := httptest.NewRequest("GET", "/admin", nil)
		if tt.token != "" {
			req.Header.Set("X-Token", tt.token)
		}
		rec := httptest.NewRecorder()
		RequireToken(inner).ServeHTTP(rec, req)
		if rec.Code != tt.wantCode || rec.Body.String() != tt.wantBody {
			t.Errorf("X-Token=%q → %d %q，想要 %d %q", tt.token, rec.Code, rec.Body.String(), tt.wantCode, tt.wantBody)
		}
		if called != tt.wantCall {
			t.Errorf("X-Token=%q 時 next 被呼叫 = %v，想要 %v", tt.token, called, tt.wantCall)
		}
	}
}
