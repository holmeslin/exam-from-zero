package main

type Incrementer interface {
	Inc()
}

type Counter struct {
	Count int
}

// 這個方法有問題：透過介面呼叫好幾次，Count 還是 0。請修正它。
func (c Counter) Inc() {
	c.Count++
}

// AddN 透過介面呼叫 n 次 Inc。
func AddN(i Incrementer, n int) {
	for range n {
		i.Inc()
	}
}

func main() {}
