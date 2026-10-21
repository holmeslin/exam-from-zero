package main

import "io/fs"

// CountByExt 走訪 fsys 裡所有的檔案（不算目錄），依副檔名統計數量。
// 沒有副檔名的檔案算在 "" 底下。
func CountByExt(fsys fs.FS) (map[string]int, error) {
	counts := map[string]int{}
	// TODO
	return counts, nil
}

func main() {}
