package main

import (
	"database/sql"
	"testing"
)

func score(n int64) sql.Null[int64] { return sql.Null[int64]{V: n, Valid: true} }

func TestStats(t *testing.T) {
	null := sql.Null[int64]{}
	cases := []struct {
		scores []sql.Null[int64]
		avg    float64
		absent int
	}{
		{[]sql.Null[int64]{score(80), score(0), null}, 40, 1},
		{[]sql.Null[int64]{score(90), score(70), score(65)}, 75, 0},
		{[]sql.Null[int64]{score(85), score(70)}, 77.5, 0},
		{[]sql.Null[int64]{null, null}, 0, 2},
		{nil, 0, 0},
	}
	for _, c := range cases {
		avg, absent := Stats(c.scores)
		if avg != c.avg || absent != c.absent {
			t.Errorf("Stats(%+v) = (%v, %d), want (%v, %d)", c.scores, avg, absent, c.avg, c.absent)
		}
	}
}
