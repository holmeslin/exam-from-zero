package main

import "database/sql"

// Describe 回傳一位會員的電話描述：
//   - phone 是 NULL：「<name>：沒填」
//   - 有值（包括空字串）：「<name>：<用 %q 印出的電話>」
func Describe(name string, phone sql.NullString) string {
	// TODO
	return name + "：" + phone.String
}

func main() {}
