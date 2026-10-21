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

// Pop 取出並回傳最上面的元素；空的時候回傳 nil。
// TODO: 取出之後，底層陣列那一格還留著指標，GC 會以為它還在用。
// 請在縮短切片前把那一格設成 nil。
func (s *Stack) Pop() *Image {
	if len(s.items) == 0 {
		return nil
	}
	last := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return last
}

func main() {}
