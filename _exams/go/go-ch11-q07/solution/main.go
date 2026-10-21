package main

// Go 1.26 起可以寫成 type Adder[A Adder[A]] interface{ ... }；
// 這裡用 Go 1.25 也能編譯的寫法，「A 能跟自己相加」的要求寫在 Sum 的約束上。
type Adder[A any] interface {
	Add(A) A
}

type Money int

// Add 回傳兩筆金額的和。
func (m Money) Add(o Money) Money {
	return m + o
}

// Sum 從零值開始，用 Add 把 xs 全部加起來。
func Sum[A Adder[A]](xs ...A) A {
	var total A
	for _, x := range xs {
		total = total.Add(x)
	}
	return total
}

func main() {}
