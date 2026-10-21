package main

import (
	"fmt"
	"net/http"
)

// RequireToken 是一個 middleware：
// 請求標頭 X-Token 等於 "secret" 才交給 next 處理；
// 否則用 http.Error 回 401（http.StatusUnauthorized），訊息是 "unauthorized"，而且不能呼叫 next。
func RequireToken(next http.Handler) http.Handler {
	// TODO
	return next
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /admin", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "後台")
	})
	fmt.Println(RequireToken(mux) != nil)
}
