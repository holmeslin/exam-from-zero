package main

import (
	"errors"
	"fmt"
)

// ValidationError 記錄哪個欄位填了什麼值
type ValidationError struct {
	Field string
	Value int
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("欄位 %s 的值 %d 不合法", e.Field, e.Value)
}

// BadField 從 err（可能被包裝過）找出 *ValidationError，回傳它的 Field 和 true；
// 找不到時回傳 "" 和 false。
func BadField(err error) (string, bool) {
	var ve *ValidationError
	if errors.As(err, &ve) {
		return ve.Field, true
	}
	return "", false
}

func main() {}
