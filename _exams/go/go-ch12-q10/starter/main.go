package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Order struct {
	// TODO: 補上欄位與 json tag：id（整數）、item（字串）、price（整數）
}

func main() {
	dec := json.NewDecoder(os.Stdin)
	_ = dec
	// TODO: 一筆一筆解碼直到 io.EOF，每筆印出「#編號 品項 價格」，最後印出「合計: 總價」
	fmt.Println("合計: 0")
}
