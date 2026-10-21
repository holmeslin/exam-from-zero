package main

import "math/rand/v2"

// RollDice 用 r 擲 n 次六面骰，回傳每次的點數（1～6）。
func RollDice(r *rand.Rand, n int) []int {
	rolls := make([]int, n)
	for i := range rolls {
		rolls[i] = r.IntN(6) + 1
	}
	return rolls
}

func main() {}
