package main

type Book struct {
	Title string
	Pages int
}

func TotalPages(books []Book) int {
	total := 0
	for _, b := range books {
		total += b.Pages
	}
	return total
}

func main() {}
