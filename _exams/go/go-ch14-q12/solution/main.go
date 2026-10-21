package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		http.Error(w, "缺少 name", http.StatusBadRequest)
		return
	}
	fmt.Fprintf(w, "哈囉，%s\n", name)
}

func main() {
	for _, target := range []string{"/hello?name=小明", "/hello"} {
		req := httptest.NewRequest(http.MethodGet, target, nil)
		rec := httptest.NewRecorder()
		Hello(rec, req)
		fmt.Print(rec.Code, " ", rec.Body.String())
	}
}
