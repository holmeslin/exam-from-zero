package main

import (
	"fmt"
	"net/http"
)

// Hello 依查詢參數 name 打招呼；沒有 name 時回 400。（不用改）
func Hello(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		http.Error(w, "缺少 name", http.StatusBadRequest)
		return
	}
	fmt.Fprintf(w, "哈囉，%s\n", name)
}

func main() {
	// TODO：用 httptest.NewRequest 和 httptest.NewRecorder，
	// 依序對 "/hello?name=小明" 和 "/hello" 呼叫 Hello，
	// 每次印出「狀態碼 空白 內容」，例如 fmt.Print(rec.Code, " ", rec.Body.String())
}
