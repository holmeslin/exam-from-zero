package main

import (
	"cmp"
	"slices"
)

type Student struct {
	Name  string
	Score int
}

func SortStudents(students []Student) {
	slices.SortFunc(students, func(a, b Student) int {
		if c := cmp.Compare(b.Score, a.Score); c != 0 {
			return c
		}
		return cmp.Compare(a.Name, b.Name)
	})
}

func main() {}
