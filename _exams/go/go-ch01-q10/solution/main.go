package main

import "fmt"

func main() {
	age := 70
	if age < 12 || age >= 65 {
		fmt.Println("優待票")
	} else {
		fmt.Println("全票")
	}
}
