package main

import "io"

// Profile 對 work 做 CPU profiling：開始記錄並寫進 w、執行 work、停止記錄。
// 開始記錄失敗時回傳那個錯誤（此時不執行 work）。
func Profile(w io.Writer, work func()) error {
	// TODO: 用 runtime/pprof 的 StartCPUProfile / StopCPUProfile
	work()
	return nil
}

func main() {}
