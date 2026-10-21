package main

import "fmt"

func main() {
	scores := []struct {
		Name  string
		Score int
	}{
		{Name: "Andy", Score: 90},
		{Name: "Betty", Score: 85},
		{Name: "Cindy", Score: 77},
	}
	total := 0
	for _, s := range scores {
		fmt.Printf("%s: %d\n", s.Name, s.Score)
		total += s.Score
	}
	fmt.Println("總分:", total)
}
