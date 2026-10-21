package main

import (
	"fmt"
	"runtime/debug"
)

func main() {
	debug.SetGCPercent(80)
	old := debug.SetGCPercent(150)
	fmt.Println("原本的 GOGC：", old)

	debug.SetMemoryLimit(512 << 20)
	fmt.Println("目前的記憶體上限：", debug.SetMemoryLimit(-1))
}
