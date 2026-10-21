package main

import (
	"database/sql"
	"errors"
	"fmt"
)

var ErrNotFound = errors.New("找不到這本書")

func LookupErr(id int, err error) error {
	if errors.Is(err, sql.ErrNoRows) {
		return ErrNotFound
	}
	if err != nil {
		return fmt.Errorf("查詢第 %d 本書：%w", id, err)
	}
	return nil
}

func main() {}
