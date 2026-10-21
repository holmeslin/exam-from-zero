package greet

type Person struct {
	Name string
	age  int
}

func shout(s string) string {
	return s + "！！！"
}
