package main

import "fmt"

func checkPickup(hasID bool, code int, days int) string {
	// TODO: 用 early return 改寫：每種「不能領」的情況先 return，最後才回傳「可以領取」
	return ""
}

func main() {
	fmt.Println(checkPickup(true, 1234, 3))
	fmt.Println(checkPickup(false, 1234, 3))
	fmt.Println(checkPickup(true, 9999, 3))
	fmt.Println(checkPickup(true, 1234, 10))
}
