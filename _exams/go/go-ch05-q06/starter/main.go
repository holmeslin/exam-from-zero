package main

// ValidationError 記錄哪個欄位填了什麼值
type ValidationError struct {
	Field string
	Value int
}

// TODO：讓 *ValidationError 成為 error，訊息是「欄位 <Field> 的值 <Value> 不合法」
func (e *ValidationError) Error() string {
	return ""
}

// BadField 從 err（可能被包裝過）找出 *ValidationError，回傳它的 Field 和 true；
// 找不到時回傳 "" 和 false。
func BadField(err error) (string, bool) {
	// TODO
	return "", false
}

func main() {}
