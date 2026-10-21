package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

// GoFiles 走訪 root 底下所有資料夾，回傳每個 .go 檔相對於 root 的路徑（照 WalkDir 走訪的順序）。
// 名稱是 ".git" 或 "vendor" 的資料夾整個跳過，不要進去。
func GoFiles(root string) ([]string, error) {
	var files []string
	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() && (d.Name() == ".git" || d.Name() == "vendor") {
			return filepath.SkipDir
		}
		if !d.IsDir() && filepath.Ext(path) == ".go" {
			rel, err := filepath.Rel(root, path)
			if err != nil {
				return err
			}
			files = append(files, rel)
		}
		return nil
	})
	return files, err
}

func main() {
	files, err := GoFiles(".")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Println(files)
}
