package main

import (
	"database/sql"
	"fmt"
)

func main() {
	_, err := sql.Open("sqlite", ":memory:")
	fmt.Println(err)
	fmt.Println(len(sql.Drivers()))
}
