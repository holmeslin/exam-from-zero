package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

type Order struct {
	ID    int    `json:"id"`
	Item  string `json:"item"`
	Price int    `json:"price"`
}

func main() {
	dec := json.NewDecoder(os.Stdin)
	total := 0
	for {
		var o Order
		err := dec.Decode(&o)
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("錯誤:", err)
			return
		}
		fmt.Printf("#%d %s %d\n", o.ID, o.Item, o.Price)
		total += o.Price
	}
	fmt.Println("合計:", total)
}
