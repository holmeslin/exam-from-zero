package main

type Incrementer interface {
	Inc()
}

type Counter struct {
	Count int
}

func (c *Counter) Inc() {
	c.Count++
}

// AddN 透過介面呼叫 n 次 Inc。
func AddN(i Incrementer, n int) {
	for range n {
		i.Inc()
	}
}

func main() {}
