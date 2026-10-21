package main

import "testing"

func TestSafeDivOK(t *testing.T) {
	got, err := SafeDiv(10, 2)
	if got != 5 || err != nil {
		t.Errorf("SafeDiv(10, 2) = %d, %v, want 5, <nil>", got, err)
	}
}

func TestSafeDivZero(t *testing.T) {
	got, err := SafeDiv(10, 0)
	if err == nil {
		t.Fatalf("SafeDiv(10, 0) 的錯誤是 nil，應該回傳錯誤")
	}
	if got != 0 {
		t.Errorf("SafeDiv(10, 0) 的第一個回傳值 = %d, want 0", got)
	}
	if err.Error() != "除數不能是 0" {
		t.Errorf("錯誤訊息 = %q, want %q", err.Error(), "除數不能是 0")
	}
}
