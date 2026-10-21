package main

func Map[T, U any](items []T, f func(T) U) []U {
	result := make([]U, 0, len(items))
	for _, v := range items {
		result = append(result, f(v))
	}
	return result
}

func main() {}
