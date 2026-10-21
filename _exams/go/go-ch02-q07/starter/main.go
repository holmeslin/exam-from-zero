package main

import "fmt"

func toHoursMinutes(total int) (int, int) {
	// TODO: 回傳小時和分鐘
	return 0, 0
}

func main() {
	h, m := toHoursMinutes(135)
	fmt.Println(135, "分鐘 =", h, "小時", m, "分鐘")
	h, m = toHoursMinutes(50)
	fmt.Println(50, "分鐘 =", h, "小時", m, "分鐘")
	// TODO: 只需要小時：用 _ 丟掉分鐘，印出「200 分鐘大約是 3 小時」
}
