package main

type Counter struct {
	total int
}

func (c *Counter) Add(n int) {
	c.total += n
}

// AdderOf 回傳「已經綁好 c」的 Add 方法值，呼叫它就會加到 c.total。
func AdderOf(c *Counter) func(int) {
	// TODO
	return func(int) {}
}

// AddExpr 回傳 Counter 的 Add 方法運算式，接收者是第一個參數。
func AddExpr() func(*Counter, int) {
	// TODO
	return func(*Counter, int) {}
}

func main() {}
