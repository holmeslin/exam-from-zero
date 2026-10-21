package main

import (
	"go/ast"
	"go/doc"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestDocComments(t *testing.T) {
	names, _ := filepath.Glob("greet/*.go")
	fset := token.NewFileSet()
	var files []*ast.File
	for _, n := range names {
		if strings.HasSuffix(n, "_test.go") {
			continue
		}
		src, err := os.ReadFile(n)
		if err != nil {
			t.Fatal(err)
		}
		f, err := parser.ParseFile(fset, n, src, parser.ParseComments)
		if err != nil {
			t.Fatalf("無法解析 %s：%v", n, err)
		}
		files = append(files, f)
	}
	p, err := doc.NewFromFiles(fset, files, "q/greet")
	if err != nil {
		t.Fatal(err)
	}
	if !strings.HasPrefix(p.Doc, "Package greet ") {
		t.Errorf("套件註解 = %q，想要以 \"Package greet \" 開頭", p.Doc)
	}
	want := map[string]bool{"Hello": false, "Bye": false}
	for _, f := range p.Funcs {
		if _, ok := want[f.Name]; !ok {
			continue
		}
		want[f.Name] = true
		if !strings.HasPrefix(f.Doc, f.Name+" ") {
			t.Errorf("%s 的文件註解 = %q，想要以 \"%s \" 開頭", f.Name, f.Doc, f.Name)
		}
	}
	for name, found := range want {
		if !found {
			t.Errorf("找不到匯出的函式 %s", name)
		}
	}
}
