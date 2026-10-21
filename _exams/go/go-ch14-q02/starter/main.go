package main

import (
	"fmt"
	"net/http"
)

// Hello 讀取查詢參數 name（沒有就用「世界」），
// 寫出兩行：「哈囉，<name>！」和「你用 <方法> 方法請求了 <路徑>」。
func Hello(w http.ResponseWriter, r *http.Request) {
	// TODO
	fmt.Fprintln(w, "TODO")
}

func main() {
	http.HandleFunc("/", Hello)
	fmt.Println("伺服器啟動：http://localhost:8080")
	// 測試只會呼叫 Hello，不會執行 main
}
