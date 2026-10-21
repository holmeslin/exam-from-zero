package main

type Image struct {
	Name   string
	Pixels []byte
}

type Stack struct {
	items []*Image
}

func (s *Stack) Push(img *Image) {
	s.items = append(s.items, img)
}

func (s *Stack) Pop() *Image {
	if len(s.items) == 0 {
		return nil
	}
	i := len(s.items) - 1
	last := s.items[i]
	s.items[i] = nil
	s.items = s.items[:i]
	return last
}

func main() {}
