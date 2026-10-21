package main

import (
	"reflect"
	"strings"
)

// JSONNames 回傳 struct x 每個欄位在 JSON 裡的名字（依欄位順序）。
func JSONNames(x any) []string {
	t := reflect.TypeOf(x)
	var names []string
	for i := range t.NumField() {
		f := t.Field(i)
		name, _, _ := strings.Cut(f.Tag.Get("json"), ",")
		if name == "" {
			name = f.Name
		}
		names = append(names, name)
	}
	return names
}

func main() {}
