package main

import "fmt"

func main() {
	var balance int
	balance = balance + 500
	fmt.Println("存款：", balance)
	balance = balance - 120
	fmt.Println("存款：", balance)
	balance = balance + 300
	fmt.Println("存款：", balance)
}
