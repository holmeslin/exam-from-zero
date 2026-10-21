package main

import "io"

// countingWriter 把寫進來的資料原封不動交給 w，並累計總共收下幾個 byte。
type countingWriter struct {
	w io.Writer
	n int
}

func (c *countingWriter) Write(p []byte) (int, error) {
	// TODO: 把 p 寫進 c.w，累加 c.n，回傳收下的 byte 數
	return 0, nil
}

func main() {}
