package main

import (
	"fmt"
	"net/http"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "世界"
	}
	fmt.Fprintf(w, "哈囉，%s！\n", name)
	fmt.Fprintf(w, "你用 %s 方法請求了 %s\n", r.Method, r.URL.Path)
}

func main() {
	http.HandleFunc("/", Hello)
	fmt.Println("伺服器啟動：http://localhost:8080")
}
