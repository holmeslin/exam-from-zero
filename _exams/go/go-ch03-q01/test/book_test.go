package main

import "testing"

func TestTotalPages(t *testing.T) {
	books := []Book{
		{Title: "小王子", Pages: 96},
		{Title: "Go 入門", Pages: 300},
		{Title: "短篇", Pages: 4},
	}
	if got := TotalPages(books); got != 400 {
		t.Errorf("TotalPages(三本書) = %d, want 400", got)
	}
	if got := TotalPages(nil); got != 0 {
		t.Errorf("TotalPages(nil) = %d, want 0", got)
	}
}
