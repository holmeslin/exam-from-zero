package main

import (
	"bytes"
	"io"
	"runtime/pprof"
	"testing"
)

func busy() {
	n := 0
	for i := range 2_000_000 {
		n += i % 7
	}
	_ = n
}

func TestProfile(t *testing.T) {
	var buf bytes.Buffer
	ran := false
	if err := Profile(&buf, func() { ran = true; busy() }); err != nil {
		t.Fatalf("Profile 回傳錯誤：%v", err)
	}
	if !ran {
		t.Fatal("work 沒有被執行")
	}
	if b := buf.Bytes(); len(b) < 2 || b[0] != 0x1f || b[1] != 0x8b {
		t.Fatalf("w 裡沒有 profile 資料（寫入 %d 位元組）；有呼叫 StartCPUProfile(w) 並在結束時 StopCPUProfile 嗎？", buf.Len())
	}
	if err := pprof.StartCPUProfile(io.Discard); err != nil {
		t.Fatalf("Profile 結束後 CPU profiling 還沒停：%v", err)
	}
	pprof.StopCPUProfile()
}

func TestProfileStartError(t *testing.T) {
	if err := pprof.StartCPUProfile(io.Discard); err != nil {
		t.Fatalf("測試準備失敗：%v", err)
	}
	defer pprof.StopCPUProfile()
	ran := false
	if err := Profile(io.Discard, func() { ran = true }); err == nil {
		t.Error("已經在 profiling 時，Profile 應該回傳 StartCPUProfile 的錯誤，卻回傳 nil")
	}
	if ran {
		t.Error("開始記錄失敗時不應該執行 work")
	}
}
