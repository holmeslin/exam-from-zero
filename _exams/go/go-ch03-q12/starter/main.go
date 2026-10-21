package main

type Animal struct {
	Name string
}

func (a Animal) Hello() string {
	return "我是 " + a.Name
}

type Dog struct {
	Animal
	Breed string
}

// Hello 讓 Dog 有自己的打招呼方式，例如「汪！我是 Lucky，品種是 柴犬」
func (d Dog) Hello() string {
	// TODO
	return ""
}

func main() {}
