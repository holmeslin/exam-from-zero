package main

import "fmt"

// Describe 依照 x 的動態型別回傳描述：
//   int    → "整數 <值的兩倍>"，例如 21 → "整數 42"
//   string → "字串 <長度>"，例如 "Go" → "字串 2"
//   bool   → "布林 <相反的值>"，例如 true → "布林 false"
//   nil    → "沒有東西"
//   其他   → "其他 <型別>"，例如 3.14 → "其他 float64"
func Describe(x any) string {
	// TODO: 用 type switch 改寫
	return fmt.Sprint(x)
}

func main() {}
