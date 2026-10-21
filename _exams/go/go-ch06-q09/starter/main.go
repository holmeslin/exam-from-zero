package main

import "fmt"

type Score int

func (s Score) String() string {
	return fmt.Sprintf("%d 分", int(s))
}

// TODO: 這個約束只接受 int、int64 本身，所以 Total([]Score{...}) 編譯不過。
// 修改 Integer，讓底層型別是 int 或 int64 的自訂型別也能用。
type Integer interface {
	int | int64
}

// Total 回傳 nums 的總和，回傳型別要和元素型別一樣。
func Total[T Integer](nums []T) T {
	var sum T
	for _, n := range nums {
		sum += n
	}
	return sum
}

func main() {
	fmt.Println(Total([]int{1, 2, 3}))
}
