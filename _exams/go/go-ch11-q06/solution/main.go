package main

type Set[T comparable] = map[T]struct{}

// Unique 回傳 words 裡出現過的字（每個字只記一次）。
func Unique(words []string) Set[string] {
	seen := Set[string]{}
	for _, w := range words {
		seen[w] = struct{}{}
	}
	return seen
}

func main() {}
