package main

import (
	"encoding/json"
	"fmt"
)

type Maker struct {
	Country string `json:"country"`
}

// TODO：替 Product 的欄位加上 json tag
type Product struct {
	Name  string
	Price int
	Note  string
	Maker Maker
}

func main() {
	data, err := json.Marshal(Product{Name: "Pen", Price: 30})
	if err != nil {
		fmt.Println("錯誤:", err)
		return
	}
	fmt.Println(string(data))
}
