package main

import "fmt"

func main() {
	steps := [7]int{6000, 8500, 7200, 9100, 4300, 12000, 10500}
	fmt.Println("第一天：", steps[0])
	fmt.Println("最後一天：", steps[len(steps)-1])
	steps[4] = 5000
	fmt.Println(steps)
	fmt.Println("天數：", len(steps))
}
