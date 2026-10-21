package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"testing"
	"time"
)

func TestClassify(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Millisecond)
	defer cancel()
	<-ctx.Done()
	ctx2, cancel2 := context.WithCancel(context.Background())
	cancel2()

	cases := []struct {
		desc string
		err  error
		want string
	}{
		{"nil", nil, "成功"},
		{"逾時的 ctx.Err()", ctx.Err(), "逾時"},
		{"包過的逾時", fmt.Errorf("查詢：%w", context.DeadlineExceeded), "逾時"},
		{"取消的 ctx.Err()", ctx2.Err(), "取消"},
		{"包過的取消", fmt.Errorf("查詢：%w", context.Canceled), "取消"},
		{"sql.ErrNoRows", sql.ErrNoRows, "錯誤"},
		{"其他錯誤", errors.New("連線中斷"), "錯誤"},
	}
	for _, c := range cases {
		if got := Classify(c.err); got != c.want {
			t.Errorf("%s：Classify(%v) = %q, want %q", c.desc, c.err, got, c.want)
		}
	}
}
