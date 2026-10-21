package main

import "fmt"

func Describe(x any) string {
	switch v := x.(type) {
	case int:
		return fmt.Sprintf("整數 %d", v*2)
	case string:
		return fmt.Sprintf("字串 %d", len(v))
	case bool:
		return fmt.Sprintf("布林 %v", !v)
	case nil:
		return "沒有東西"
	default:
		return fmt.Sprintf("其他 %T", v)
	}
}

func main() {}
