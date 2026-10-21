package main

import "os"

// SafeRead 讀出 dir 目錄裡名為 name 的檔案。
// name 來自使用者，不能讓它讀到 dir 以外的檔案。
func SafeRead(dir, name string) ([]byte, error) {
	root, err := os.OpenRoot(dir)
	if err != nil {
		return nil, err
	}
	defer root.Close()
	return root.ReadFile(name)
}

func main() {}
