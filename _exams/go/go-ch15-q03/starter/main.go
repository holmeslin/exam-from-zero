package main

import "errors"

var ErrNotFound = errors.New("找不到這本書")

// LookupErr 整理 QueryRow(...).Scan 回傳的 err：
//   - nil 就回傳 nil
//   - sql.ErrNoRows（包括被 %w 包過的）換成 ErrNotFound
//   - 其他錯誤用 %w 包成「查詢第 <id> 本書：<原錯誤>」
func LookupErr(id int, err error) error {
	// TODO
	return err
}

func main() {}
