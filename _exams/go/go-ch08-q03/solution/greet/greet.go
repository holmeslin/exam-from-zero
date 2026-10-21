package greet

type Person struct {
	Name string
	Age  int
}

func Shout(s string) string {
	return s + "！！！"
}
