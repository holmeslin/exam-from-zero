package main

type User struct {
	Name  string
	Admin bool
}

// CanDelete：u 是 nil 時回傳 false，否則回傳 u.Admin。
func CanDelete(u *User) bool {
	// TODO
	return false
}

// FirstIs：names 的第一個元素等於 want 時回傳 true；空切片回傳 false。
func FirstIs(names []string, want string) bool {
	// TODO
	return false
}

func main() {}
