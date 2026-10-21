package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

type Item struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
}

type Store struct {
	mu     sync.Mutex
	items  map[int]Item
	nextID int
}

func NewStore() *Store {
	return &Store{items: map[int]Item{}}
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

// Create 處理 POST /items：
//  1. 用 http.MaxBytesReader 把 r.Body 限制在 1 MB
//  2. 把請求內容解碼成 {"name": ..., "price": ...}；格式錯誤回 400
//  3. name 空白或 price 是負數也回 400
//  4. 在鎖裡給新商品下一個 ID（從 1 開始）並存進 items
//  5. 用 writeJSON 回 201 和新商品
func (s *Store) Create(w http.ResponseWriter, r *http.Request) {
	// TODO
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /items", NewStore().Create)
	fmt.Println(mux != nil)
}
