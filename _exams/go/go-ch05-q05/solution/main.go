package main

import (
	"errors"
	"fmt"
)

var ErrNotFound = errors.New("找不到商品")
var ErrOutOfStock = errors.New("庫存不足")

// Buy 從 stock 買一個 item。
// 找不到商品、庫存為 0 時，回傳用「購買 <item>：%w」包裝過的哨兵錯誤；成功時庫存減 1。
func Buy(stock map[string]int, item string) error {
	n, ok := stock[item]
	if !ok {
		return fmt.Errorf("購買 %s：%w", item, ErrNotFound)
	}
	if n == 0 {
		return fmt.Errorf("購買 %s：%w", item, ErrOutOfStock)
	}
	stock[item] = n - 1
	return nil
}

// Advice 依錯誤種類回傳建議文字（錯誤可能被包裝過好幾層）。
func Advice(err error) string {
	switch {
	case err == nil:
		return "購買成功"
	case errors.Is(err, ErrNotFound):
		return "要不要看看別的？"
	case errors.Is(err, ErrOutOfStock):
		return "請等補貨"
	default:
		return "發生未知錯誤"
	}
}

func main() {}
