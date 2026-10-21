package main

import "fmt"

func cheer(name string, times int) {
	for range times {
		fmt.Println("加油，", name)
	}
}

func main() {
	cheer("小明", 2)
	cheer("阿華", 3)
}
