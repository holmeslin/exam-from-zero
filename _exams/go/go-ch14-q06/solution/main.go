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

func (s *Store) Create(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
	var in struct {
		Name  string `json:"name"`
		Price int    `json:"price"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		http.Error(w, "JSON 格式錯誤："+err.Error(), http.StatusBadRequest)
		return
	}
	if in.Name == "" || in.Price < 0 {
		http.Error(w, "name 不能空白，price 不能是負數", http.StatusBadRequest)
		return
	}

	s.mu.Lock()
	s.nextID++
	item := Item{ID: s.nextID, Name: in.Name, Price: in.Price}
	s.items[item.ID] = item
	s.mu.Unlock()

	writeJSON(w, http.StatusCreated, item)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /items", NewStore().Create)
	fmt.Println(mux != nil)
}
