package main

import "fmt"

func toHoursMinutes(total int) (int, int) {
	return total / 60, total % 60
}

func main() {
	h, m := toHoursMinutes(135)
	fmt.Println(135, "分鐘 =", h, "小時", m, "分鐘")
	h, m = toHoursMinutes(50)
	fmt.Println(50, "分鐘 =", h, "小時", m, "分鐘")
	hours, _ := toHoursMinutes(200)
	fmt.Println(200, "分鐘大約是", hours, "小時")
}
