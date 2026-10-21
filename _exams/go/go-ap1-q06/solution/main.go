package main

type Counter struct {
	total int
}

func (c *Counter) Add(n int) {
	c.total += n
}

func AdderOf(c *Counter) func(int) {
	return c.Add
}

func AddExpr() func(*Counter, int) {
	return (*Counter).Add
}

func main() {}
