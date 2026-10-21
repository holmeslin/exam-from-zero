package main

// InsertSQL 組出一段 INSERT 指令，值一律用 ? 佔位。
// 例如 InsertSQL("books", []string{"title", "price"}) 回傳
// "INSERT INTO books (title, price) VALUES (?, ?)"
func InsertSQL(table string, cols []string) string {
	// TODO
	return ""
}

func main() {}
