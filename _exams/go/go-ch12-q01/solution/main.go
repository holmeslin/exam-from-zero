package main

import "io"

// countingWriter 把寫進來的資料原封不動交給 w，並累計總共收下幾個 byte。
type countingWriter struct {
	w io.Writer
	n int
}

func (c *countingWriter) Write(p []byte) (int, error) {
	n, err := c.w.Write(p)
	c.n += n
	return n, err
}

func main() {}
