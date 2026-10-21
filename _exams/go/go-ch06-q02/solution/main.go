package main

func MakeAccumulator(start int) func(int) int {
	total := start
	return func(n int) int {
		total += n
		return total
	}
}

func main() {}
