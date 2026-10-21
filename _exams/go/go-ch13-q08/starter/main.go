package main

import (
	"fmt"
	"os"
)

// GoFiles 走訪 root 底下所有資料夾，回傳每個 .go 檔相對於 root 的路徑（照 WalkDir 走訪的順序）。
// 名稱是 ".git" 或 "vendor" 的資料夾整個跳過，不要進去。
func GoFiles(root string) ([]string, error) {
	// TODO：用 filepath.WalkDir；跳過資料夾要回傳 filepath.SkipDir
	// 路徑用 filepath.Rel(root, path) 轉成相對路徑
	return nil, nil
}

func main() {
	files, err := GoFiles(".")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Println(files)
}
