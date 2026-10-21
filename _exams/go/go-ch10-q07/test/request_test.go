package main

import (
	"context"
	"testing"
)

func TestIDRoundTrip(t *testing.T) {
	ctx := WithID(context.Background(), "req-42")
	if id, ok := IDFrom(ctx); id != "req-42" || !ok {
		t.Errorf("IDFrom(WithID(ctx, \"req-42\")) = (%q, %v), want (\"req-42\", true)", id, ok)
	}
}

func TestIDMissing(t *testing.T) {
	if id, ok := IDFrom(context.Background()); id != "" || ok {
		t.Errorf("IDFrom(context.Background()) = (%q, %v), want (\"\", false)", id, ok)
	}
}

func TestIDFromChild(t *testing.T) {
	parent := WithID(context.Background(), "req-7")
	child, cancel := context.WithCancel(parent)
	defer cancel()
	if id, ok := IDFrom(child); id != "req-7" || !ok {
		t.Errorf("從子 context 取 IDFrom = (%q, %v), want (\"req-7\", true)", id, ok)
	}
}

func TestIDNoCollision(t *testing.T) {
	ctx := WithID(context.Background(), "req-1")
	for _, k := range []any{"id", "requestID", "requestId", "request_id", 0} {
		ctx = context.WithValue(ctx, k, "別的套件的資料")
	}
	if id, ok := IDFrom(ctx); id != "req-1" || !ok {
		t.Errorf("被其他 key 覆蓋了：IDFrom = (%q, %v), want (\"req-1\", true)；key 要用自訂型別", id, ok)
	}
}
