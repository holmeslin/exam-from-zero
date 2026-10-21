package main

// Classify 依照 QueryRowContext(...).Scan 回傳的 err 分類：
//   - nil → "成功"
//   - 逾時（context.DeadlineExceeded，包括被 %w 包過的）→ "逾時"
//   - 取消（context.Canceled，包括被 %w 包過的）→ "取消"
//   - 其他 → "錯誤"
func Classify(err error) string {
	// TODO
	if err == nil {
		return "成功"
	}
	return "錯誤"
}

func main() {}
