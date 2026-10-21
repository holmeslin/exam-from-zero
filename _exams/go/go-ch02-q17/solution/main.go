package main

import "fmt"

func main() {
	original := []int{3, 1, 4}
	backup := []int{0, 0, 0}
	n := copy(backup, original)
	fmt.Println("複製了", n, "個")
	original[0] = 99
	fmt.Println("original:", original)
	fmt.Println("backup:", backup)
}
