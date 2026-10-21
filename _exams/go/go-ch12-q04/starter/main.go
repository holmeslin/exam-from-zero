package main

import (
	"os"
	"path/filepath"
)

// SafeRead 讀出 dir 目錄裡名為 name 的檔案。
// name 來自使用者，不能讓它讀到 dir 以外的檔案。
func SafeRead(dir, name string) ([]byte, error) {
	// TODO: 這樣寫會被路徑穿越攻擊，請改成安全的寫法
	return os.ReadFile(filepath.Join(dir, name))
}

func main() {}
