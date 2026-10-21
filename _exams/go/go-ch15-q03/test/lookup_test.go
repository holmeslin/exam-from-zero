package main

import (
	"database/sql"
	"errors"
	"fmt"
	"testing"
)

func TestLookupErr(t *testing.T) {
	if got := LookupErr(1, nil); got != nil {
		t.Errorf("LookupErr(1, nil) = %v, want nil", got)
	}
	if got := LookupErr(99, sql.ErrNoRows); got != ErrNotFound {
		t.Errorf("LookupErr(99, sql.ErrNoRows) = %v, want ErrNotFound", got)
	}
	wrapped := fmt.Errorf("db: %w", sql.ErrNoRows)
	if got := LookupErr(99, wrapped); got != ErrNotFound {
		t.Errorf("被 %%w 包過的 sql.ErrNoRows：LookupErr = %v, want ErrNotFound（用 errors.Is 判斷）", got)
	}
	boom := errors.New("連線中斷")
	got := LookupErr(7, boom)
	if got == nil || got.Error() != "查詢第 7 本書：連線中斷" {
		t.Errorf("LookupErr(7, boom) = %v, want 查詢第 7 本書：連線中斷", got)
	}
	if !errors.Is(got, boom) {
		t.Errorf("errors.Is(LookupErr(7, boom), boom) = false，原錯誤要用 %%w 包起來")
	}
	if errors.Is(got, ErrNotFound) {
		t.Errorf("其他錯誤不應該變成 ErrNotFound")
	}
}
