package main

type Person struct {
	Name string
	Age  int
}

func Oldest(people []Person) *Person {
	var best *Person
	for i := range people {
		if best == nil || people[i].Age > best.Age {
			best = &people[i]
		}
	}
	return best
}

func main() {}
