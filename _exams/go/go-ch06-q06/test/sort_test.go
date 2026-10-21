package main

import (
	"slices"
	"testing"
)

func TestSortStudents(t *testing.T) {
	got := []Student{{"Mia", 90}, {"Andy", 75}, {"Zoe", 100}, {"Leo", 90}, {"Ben", 75}}
	SortStudents(got)
	want := []Student{{"Zoe", 100}, {"Leo", 90}, {"Mia", 90}, {"Andy", 75}, {"Ben", 75}}
	if !slices.Equal(got, want) {
		t.Errorf("排序後 = %v, want %v", got, want)
	}
}
