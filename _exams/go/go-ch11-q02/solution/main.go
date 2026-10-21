package main

import (
	"fmt"
	"reflect"
)

// Describe 用 reflect 看 x 的種類（Kind），回傳描述文字。
func Describe(x any) string {
	v := reflect.ValueOf(x)
	switch v.Kind() {
	case reflect.Int:
		return fmt.Sprintf("整數 %d", v.Int())
	case reflect.String:
		return fmt.Sprintf("字串長度 %d", v.Len())
	case reflect.Slice:
		return fmt.Sprintf("切片長度 %d", v.Len())
	default:
		return "不處理 " + v.Kind().String()
	}
}

func main() {}
