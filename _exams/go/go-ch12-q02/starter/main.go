package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	w := bufio.NewWriter(os.Stdout)
	// TODO: 改成以單字切開，逐一輸出「編號: 單字」，最後輸出「共 N 個單字」
	// 別忘了把緩衝區的內容真正寫出去
	_ = scanner
	fmt.Fprintln(w, "共 0 個單字")
}
