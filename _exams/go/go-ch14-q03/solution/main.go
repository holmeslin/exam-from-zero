package main

import (
	"fmt"
	"net/http"
)

func NewMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "user", r.PathValue("id"))
	})
	mux.HandleFunc("GET /users/me", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "me")
	})
	mux.HandleFunc("GET /files/{path...}", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "file", r.PathValue("path"))
	})
	return mux
}

func main() {
	fmt.Println(NewMux() != nil)
}
