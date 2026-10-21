package main

type Tags struct {
	set map[string]bool
}

func (t *Tags) Add(tag string) {
	if t.set == nil {
		t.set = make(map[string]bool)
	}
	t.set[tag] = true
}

func (t *Tags) Has(tag string) bool {
	return t.set[tag]
}

func (t *Tags) Len() int {
	return len(t.set)
}

func main() {}
