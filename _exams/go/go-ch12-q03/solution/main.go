package main

import (
	"errors"
	"fmt"
	"os"
)

// ReadOrDefault 讀出 path 的內容；檔案不存在時回傳 def 和 nil，其他錯誤照樣回傳。
func ReadOrDefault(path, def string) (string, error) {
	data, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return def, nil
	}
	if err != nil {
		return "", err
	}
	return string(data), nil
}

// AppendLine 把 line 加上換行，附加到 path 的最後面；檔案不存在就建立（權限 0o644）。
func AppendLine(path, line string) error {
	f, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o644)
	if err != nil {
		return err
	}
	if _, err := fmt.Fprintln(f, line); err != nil {
		f.Close()
		return err
	}
	return f.Close()
}

func main() {}
