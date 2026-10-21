package main

type Point struct {
	X int
	Y int
}

func CountDistinct(points []Point) int {
	seen := map[Point]bool{}
	for _, p := range points {
		seen[p] = true
	}
	return len(seen)
}

func main() {}
