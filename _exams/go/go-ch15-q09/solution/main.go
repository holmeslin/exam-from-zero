package main

import "database/sql"

func Stats(scores []sql.Null[int64]) (avg float64, absent int) {
	var sum int64
	for _, s := range scores {
		if !s.Valid {
			absent++
			continue
		}
		sum += s.V
	}
	if n := len(scores) - absent; n > 0 {
		avg = float64(sum) / float64(n)
	}
	return avg, absent
}

func main() {}
