package main

import (
	"context"
	"errors"
	"testing"
	"time"
)

type userKey struct{}

func TestAuditSurvivesCancel(t *testing.T) {
	base := context.WithValue(context.Background(), userKey{}, "andy")
	reqCtx, cancel := context.WithCancel(base)
	audit, cancelAudit := AuditContext(reqCtx, time.Second)
	defer cancelAudit()

	cancel()
	if err := audit.Err(); err != nil {
		t.Errorf("reqCtx 取消後 audit.Err() = %v, want nil：試試 context.WithoutCancel", err)
	}
	if got := audit.Value(userKey{}); got != "andy" {
		t.Errorf("audit.Value(userKey) = %v, want andy", got)
	}
}

func TestAuditHasLimit(t *testing.T) {
	reqCtx, cancel := context.WithCancel(context.Background())
	defer cancel()
	audit, cancelAudit := AuditContext(reqCtx, 20*time.Millisecond)
	defer cancelAudit()

	if _, ok := audit.Deadline(); !ok {
		t.Fatal("audit 沒有截止時間：要再用 WithTimeout 加上時限")
	}
	select {
	case <-audit.Done():
		if !errors.Is(audit.Err(), context.DeadlineExceeded) {
			t.Errorf("audit.Err() = %v, want context.DeadlineExceeded", audit.Err())
		}
	case <-time.After(500 * time.Millisecond):
		t.Fatal("超過 limit 後 audit 沒有被取消")
	}
}
