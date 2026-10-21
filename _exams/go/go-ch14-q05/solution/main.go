package main

import (
	"fmt"
	"net/http"
	"sync/atomic"
)

type Greeter struct {
	Greeting string
}

func (g Greeter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s，%s\n", g.Greeting, r.PathValue("name"))
}

type Counter struct {
	n atomic.Int64
}

func (c *Counter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "第 %d 次\n", c.n.Add(1))
}

func NewMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("GET /hi/{name}", Greeter{Greeting: "哈囉"})
	mux.Handle("GET /count", &Counter{})
	return mux
}

func main() {
	fmt.Println(NewMux() != nil)
}
