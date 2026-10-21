package main

import (
	"fmt"
	"net/http"
)

// NewMux 建立路由表，需要這三個路由（每個都只接受 GET）：
//   /users/{id}       → 寫出「user <id>」並換行
//   /users/me         → 寫出「me」並換行
//   /files/{path...}  → 寫出「file <剩下的路徑>」並換行
func NewMux() *http.ServeMux {
	mux := http.NewServeMux()
	// TODO：用 mux.HandleFunc 登記路由
	return mux
}

func main() {
	fmt.Println(NewMux() != nil)
}
