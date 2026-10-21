package main

import (
	"fmt"
	"net/http"
	"time"
)

func WithTimeout(h http.Handler, d time.Duration) http.Handler {
	return http.TimeoutHandler(h, d, "處理逾時\n")
}

func main() {
	fmt.Println(WithTimeout(http.NewServeMux(), time.Second) != nil)
}
