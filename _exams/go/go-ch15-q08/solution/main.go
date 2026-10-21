package main

import (
	"database/sql"
	"fmt"
)

func Describe(name string, phone sql.NullString) string {
	if !phone.Valid {
		return name + "：沒填"
	}
	return fmt.Sprintf("%s：%q", name, phone.String)
}

func main() {}
