package main

import (
	"context"
	"errors"
	"strings"
	"testing"
	"time"
)

func TestFetchOK(t *testing.T) {
	var seen context.Context
	got, err := Fetch(context.Background(), time.Second, func(ctx context.Context) (string, error) {
		seen = ctx
		return "3 筆訂單", nil
	})
	if got != "3 筆訂單" || err != nil {
		t.Fatalf("Fetch = (%q, %v), want (\"3 筆訂單\", nil)", got, err)
	}
	if _, ok := seen.Deadline(); !ok {
		t.Error("傳給 fn 的 ctx 沒有截止時間：要用 context.WithTimeout 衍生")
	}
	if seen.Err() == nil {
		t.Error("Fetch 回傳後衍生的 ctx 還沒被取消：記得 defer cancel()")
	}
}

func TestFetchTimeout(t *testing.T) {
	_, err := Fetch(context.Background(), 20*time.Millisecond, func(ctx context.Context) (string, error) {
		select {
		case <-time.After(2 * time.Second):
			return "太慢了", nil
		case <-ctx.Done():
			return "", ctx.Err()
		}
	})
	if !errors.Is(err, context.DeadlineExceeded) {
		t.Fatalf("errors.Is(err, context.DeadlineExceeded) = false, err = %v：要逾時並用 %%w 包住原錯誤", err)
	}
	if err == nil || !strings.HasPrefix(err.Error(), "查詢失敗: ") {
		t.Errorf("err = %v, want 以 \"查詢失敗: \" 開頭", err)
	}
}

func TestFetchParentCanceled(t *testing.T) {
	parent, cancel := context.WithCancel(context.Background())
	cancel()
	_, err := Fetch(parent, time.Second, func(ctx context.Context) (string, error) {
		return "", ctx.Err()
	})
	if !errors.Is(err, context.Canceled) {
		t.Errorf("父 context 已取消時 err = %v, want 包著 context.Canceled：要從 parent 衍生", err)
	}
}
