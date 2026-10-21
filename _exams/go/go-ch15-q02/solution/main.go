package main

import "strings"

func InsertSQL(table string, cols []string) string {
	marks := strings.TrimSuffix(strings.Repeat("?, ", len(cols)), ", ")
	return "INSERT INTO " + table + " (" + strings.Join(cols, ", ") + ") VALUES (" + marks + ")"
}

func main() {}
