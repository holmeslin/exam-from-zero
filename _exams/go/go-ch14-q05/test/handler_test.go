package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func get(h http.Handler, target string) (int, string) {
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest("GET", target, nil))
	return rec.Code, rec.Body.String()
}

func TestHandlers(t *testing.T) {
	mux := NewMux()
	if code, body := get(mux, "/hi/小明"); code != 200 || body != "哈囉，小明\n" {
		t.Errorf("GET /hi/小明 → %d %q，想要 200 %q", code, body, "哈囉，小明\n")
	}
	for i, want := range []string{"第 1 次\n", "第 2 次\n", "第 3 次\n"} {
		if code, body := get(mux, "/count"); code != 200 || body != want {
			t.Errorf("第 %d 次 GET /count → %d %q，想要 200 %q", i+1, code, body, want)
		}
	}
	var h http.Handler = Greeter{Greeting: "Hello"}
	req := httptest.NewRequest("GET", "/x", nil)
	req.SetPathValue("name", "Andy")
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)
	if rec.Body.String() != "Hello，Andy\n" {
		t.Errorf("Greeter{Greeting: \"Hello\"} 的內容 = %q，想要 %q", rec.Body.String(), "Hello，Andy\n")
	}
}
