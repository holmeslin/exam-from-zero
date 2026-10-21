package main

import (
	"fmt"
	"net/http"
	"sync/atomic"
)

// Greeter 用欄位 Greeting 打招呼：
// 請求 /zh/小明 時寫出「<Greeting>，小明」並換行（名字來自路由的 {name}）。
type Greeter struct {
	Greeting string
}

func (g Greeter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// Counter 記錄被請求了幾次，每次寫出「第 <n> 次」並換行（n 從 1 開始）。
// 會被很多 goroutine 同時呼叫，所以用 atomic.Int64。
type Counter struct {
	n atomic.Int64
}

func (c *Counter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// TODO
}

// NewMux 登記兩個路由：
//   GET /hi/{name} → Greeter{Greeting: "哈囉"}
//   GET /count     → 一個 *Counter
func NewMux() *http.ServeMux {
	mux := http.NewServeMux()
	// TODO：用 mux.Handle 登記
	return mux
}

func main() {
	fmt.Println(NewMux() != nil)
}
