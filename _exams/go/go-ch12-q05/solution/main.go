package main

import (
	"io/fs"
	"path"
)

// CountByExt 走訪 fsys 裡所有的檔案（不算目錄），依副檔名統計數量。
// 沒有副檔名的檔案算在 "" 底下。
func CountByExt(fsys fs.FS) (map[string]int, error) {
	counts := map[string]int{}
	err := fs.WalkDir(fsys, ".", func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() {
			counts[path.Ext(p)]++
		}
		return nil
	})
	return counts, err
}

func main() {}
