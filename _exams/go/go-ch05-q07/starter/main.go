package main

import "errors"

var ErrEmptyName = errors.New("名字不能空白")
var ErrBadAge = errors.New("年齡要在 0 到 150 之間")

// Validate 一次檢查所有欄位，把所有問題合成一個錯誤回傳；全部通過時回傳 nil。
func Validate(name string, age int) error {
	// TODO：用 errors.Join
	if name == "" {
		return ErrEmptyName
	}
	return nil
}

func main() {}
