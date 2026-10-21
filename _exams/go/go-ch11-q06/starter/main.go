package main

// TODO: 把 Set 改成泛型別名，讓 Set[string] 就是 map[string]struct{} 本身
type Set[T comparable] map[T]struct{}

// Unique 回傳 words 裡出現過的字（每個字只記一次）。
func Unique(words []string) Set[string] {
	// TODO
	return nil
}

func main() {}
