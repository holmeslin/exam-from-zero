package main

import (
	"context"
	"time"
)

// AuditContext 替「寫稽核紀錄」這種收尾工作準備 context：
// 不會因為 reqCtx 被取消而取消、保留 reqCtx 上的資料，但最多只給 limit 的時間。
func AuditContext(reqCtx context.Context, limit time.Duration) (context.Context, context.CancelFunc) {
	// TODO
	return context.WithCancel(reqCtx)
}

func main() {}
