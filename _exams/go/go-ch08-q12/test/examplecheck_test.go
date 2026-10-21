package main

import (
	"go/doc"
	"go/parser"
	"go/token"
	"path/filepath"
	"strings"
	"testing"
)

// go test ./... 已經會執行 greet 裡的 Example 並比對輸出；這裡只確認 ExampleBye 存在而且有 // Output:。
func TestExampleBye(t *testing.T) {
	names, _ := filepath.Glob("greet/*_test.go")
	fset := token.NewFileSet()
	for _, n := range names {
		f, err := parser.ParseFile(fset, n, nil, parser.ParseComments)
		if err != nil {
			t.Fatalf("無法解析 %s：%v", n, err)
		}
		for _, ex := range doc.Examples(f) {
			if ex.Name != "Bye" {
				continue
			}
			if f.Name.Name != "greet_test" {
				t.Errorf("%s 的套件名稱是 %s，想要 greet_test", n, f.Name.Name)
			}
			if !strings.Contains(ex.Output, "再見") {
				t.Errorf("ExampleBye 的 // Output: = %q，想要包含 greet.Bye 印出的句子", ex.Output)
			}
			return
		}
	}
	t.Errorf("在 greet 資料夾的 _test.go 檔裡找不到 ExampleBye，或它沒有 // Output: 註解")
}
