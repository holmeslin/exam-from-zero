package main

import (
	"fmt"
	"net/http"
	"time"
)

// WithTimeout 用 http.TimeoutHandler 包住 h：
// h 在 d 之內做完就照常回應；超過 d 就回 503，內容是 "處理逾時\n"。
func WithTimeout(h http.Handler, d time.Duration) http.Handler {
	// TODO
	return h
}

func main() {
	fmt.Println(WithTimeout(http.NewServeMux(), time.Second) != nil)
}
