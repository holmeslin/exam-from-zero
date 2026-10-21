package main

import (
	"strings"
	"testing"
)

func TestDivide(t *testing.T) {
	LastPanic = ""
	if got := Divide(10, 2); got != 5 {
		t.Errorf("Divide(10, 2) = %d, want 5", got)
	}
	if LastPanic != "" {
		t.Errorf("沒有 panic 時 LastPanic 應該維持空字串，got %q", LastPanic)
	}

	defer func() {
		if r := recover(); r != nil {
			t.Fatalf("Divide(10, 0) 讓 panic 跑出來了：%v", r)
		}
	}()
	if got := Divide(10, 0); got != 0 {
		t.Errorf("Divide(10, 0) = %d, want 0", got)
	}
	if !strings.Contains(LastPanic, "divide by zero") {
		t.Errorf("LastPanic = %q，應該記下 panic 的內容（含 divide by zero）", LastPanic)
	}
}
