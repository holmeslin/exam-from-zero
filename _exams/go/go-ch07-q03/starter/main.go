package main

import "iter"

// Lengths 依序交出每個字和它的字元數（以 rune 計算，中文一個字算 1）。
func Lengths(words []string) iter.Seq2[string, int] {
	return func(yield func(string, int) bool) {
		// TODO
	}
}

func main() {}
