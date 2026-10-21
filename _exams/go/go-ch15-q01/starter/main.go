package main

import (
	"database/sql"
	"fmt"
)

func main() {
	// TODO: 用 sql.Open 開啟 "sqlite" 的 ":memory:" 資料庫，印出 sql.Open 回傳的 err
	_ = sql.Drivers
	fmt.Println("TODO")
}
