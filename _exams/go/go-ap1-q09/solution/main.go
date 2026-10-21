package main

func Clone(s []int) []int {
	t := make([]int, len(s))
	copy(t, s)
	return t
}

func main() {}
