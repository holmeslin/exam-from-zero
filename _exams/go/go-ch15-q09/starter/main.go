package main

import "database/sql"

// Stats 統計一次考試的成績，Valid 為 false 代表缺考（NULL）。
// avg 是有到考者的平均（沒有人到考時為 0），absent 是缺考人數。
func Stats(scores []sql.Null[int64]) (avg float64, absent int) {
	// TODO
	return 0, 0
}

func main() {}
