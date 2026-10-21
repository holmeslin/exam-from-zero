package main

func Swap(a, b *int) {
	*a, *b = *b, *a
}

func main() {}
