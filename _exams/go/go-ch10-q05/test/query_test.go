package main

import (
	"context"
	"errors"
	"testing"
	"time"
)

func TestSlowQueryFinishes(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	got, err := SlowQuery(ctx, 5*time.Millisecond)
	if got != "完成" || err != nil {
		t.Errorf("時間充足時 SlowQuery = (%q, %v), want (\"完成\", nil)", got, err)
	}
}

func TestSlowQueryTimeout(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Millisecond)
	defer cancel()
	start := time.Now()
	got, err := SlowQuery(ctx, 2*time.Second)
	if elapsed := time.Since(start); elapsed > 500*time.Millisecond {
		t.Fatalf("逾時後過了 %v 才回傳，應該在 ctx 到期時馬上放棄", elapsed)
	}
	if got != "" || !errors.Is(err, context.DeadlineExceeded) {
		t.Errorf("逾時時 SlowQuery = (%q, %v), want (\"\", context.DeadlineExceeded)", got, err)
	}
}
