package main

import "fmt"

func main() {
	speed := 105
	if speed > 110 {
		fmt.Println("超速，罰款！")
	} else if speed >= 100 {
		fmt.Println("接近速限，請放慢")
	} else {
		fmt.Println("速度正常")
	}
}
