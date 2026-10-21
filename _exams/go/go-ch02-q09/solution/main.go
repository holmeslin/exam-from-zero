package main

import "fmt"

func checkPickup(hasID bool, code int, days int) string {
	if !hasID {
		return "請出示證件"
	}
	if code != 1234 {
		return "取件碼錯誤"
	}
	if days > 7 {
		return "已超過保管期限"
	}
	return "可以領取"
}

func main() {
	fmt.Println(checkPickup(true, 1234, 3))
	fmt.Println(checkPickup(false, 1234, 3))
	fmt.Println(checkPickup(true, 9999, 3))
	fmt.Println(checkPickup(true, 1234, 10))
}
