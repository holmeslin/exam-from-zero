package main

import "fmt"

func main() {
	days := []string{"一", "二", "三", "四", "五", "六", "日"}
	fmt.Println("上班日：", days[:5])
	fmt.Println("週末：", days[5:])
	fmt.Println("三到五：", days[2:5])
}
