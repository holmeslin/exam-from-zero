package main

import (
	"encoding/json"
	"fmt"
)

type Maker struct {
	Country string `json:"country"`
}

type Product struct {
	Name  string `json:"name"`
	Price int    `json:"price"`
	Note  string `json:"note,omitempty"`
	Maker Maker  `json:"maker,omitzero"`
}

func main() {
	data, err := json.Marshal(Product{Name: "Pen", Price: 30})
	if err != nil {
		fmt.Println("錯誤:", err)
		return
	}
	fmt.Println(string(data))
}
