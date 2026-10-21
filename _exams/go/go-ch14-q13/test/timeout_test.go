package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func work(d time.Duration) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-time.After(d):
			fmt.Fprintln(w, "做完了")
		case <-r.Context().Done():
		}
	})
}

func run(h http.Handler) *httptest.ResponseRecorder {
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest("GET", "/", nil))
	return rec
}

func TestWithTimeout(t *testing.T) {
	if rec := run(WithTimeout(work(0), 50*time.Millisecond)); rec.Code != 200 || rec.Body.String() != "做完了\n" {
		t.Errorf("夠快的 handler → %d %q，想要 200 %q", rec.Code, rec.Body.String(), "做完了\n")
	}
	if rec := run(WithTimeout(work(80*time.Millisecond), 10*time.Millisecond)); rec.Code != 503 || rec.Body.String() != "處理逾時\n" {
		t.Errorf("太慢的 handler → %d %q，想要 503 %q", rec.Code, rec.Body.String(), "處理逾時\n")
	}
}
