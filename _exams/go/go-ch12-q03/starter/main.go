package main

// ReadOrDefault 讀出 path 的內容；檔案不存在時回傳 def 和 nil，其他錯誤照樣回傳。
func ReadOrDefault(path, def string) (string, error) {
	// TODO
	return "", nil
}

// AppendLine 把 line 加上換行，附加到 path 的最後面；檔案不存在就建立（權限 0o644）。
func AppendLine(path, line string) error {
	// TODO
	return nil
}

func main() {}
