package main

type User struct {
	Name  string
	Admin bool
}

func CanDelete(u *User) bool {
	return u != nil && u.Admin
}

func FirstIs(names []string, want string) bool {
	return len(names) > 0 && names[0] == want
}

func main() {}
