package main

import (
	"errors"
	"fmt"
	"reflect"
)

// Validate 檢查 struct x：標了 validate:"required" 的欄位不能是零值。
func Validate(x any) error {
	v := reflect.ValueOf(x)
	if v.Kind() != reflect.Struct {
		return errors.New("只能檢查 struct")
	}
	t := v.Type()
	var errs []error
	for i := range t.NumField() {
		if t.Field(i).Tag.Get("validate") == "required" && v.Field(i).IsZero() {
			errs = append(errs, fmt.Errorf("%s 是必填欄位", t.Field(i).Name))
		}
	}
	return errors.Join(errs...)
}

func main() {}
