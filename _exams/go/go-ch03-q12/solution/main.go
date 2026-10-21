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

func (d Dog) Hello() string {
	return "汪！" + d.Animal.Hello() + "，品種是 " + d.Breed
}

func main() {}
