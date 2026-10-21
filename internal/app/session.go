package app

import (
	"cmp"
	"math/rand/v2"
	"slices"
)

// Run is one challenge of a chapter. It is plain data so progress can persist it as-is.
type Run struct {
	IDs     []string `json:"ids"`             // sampled questions, easy to hard
	Wrong   []string `json:"wrong,omitempty"` // answered wrong at least once in the main pass; redone at the end
	Redo    bool     `json:"redo,omitzero"`   // in the redo pass; Pos indexes Wrong
	Pos     int      `json:"pos"`
	Cleared bool     `json:"cleared,omitzero"` // current question passed, waiting for "next"
	Hinted  []string `json:"hinted,omitempty"` // questions whose hints were opened in this run
}

// newRun samples c.Sample questions not rejected by skip and orders them by difficulty.
func newRun(c *Chapter, rng *rand.Rand, skip func(id string) bool) *Run {
	var pool []*Question
	for i := range c.Questions {
		if !skip(c.Questions[i].ID) {
			pool = append(pool, &c.Questions[i])
		}
	}
	rng.Shuffle(len(pool), func(i, j int) { pool[i], pool[j] = pool[j], pool[i] })
	pool = pool[:min(c.Sample, len(pool))]
	slices.SortStableFunc(pool, func(a, b *Question) int { return cmp.Compare(a.Difficulty, b.Difficulty) })
	r := &Run{}
	for _, q := range pool {
		r.IDs = append(r.IDs, q.ID)
	}
	return r
}

func (r *Run) queue() []string {
	if r.Redo {
		return r.Wrong
	}
	return r.IDs
}

func (r *Run) Current() string { return r.queue()[r.Pos] }

// Record notes a grading outcome for the current question.
func (r *Run) Record(pass bool) {
	switch {
	case pass:
		r.Cleared = true
	case !r.Redo && !slices.Contains(r.Wrong, r.Current()):
		r.Wrong = append(r.Wrong, r.Current())
	}
}

// Next advances past a cleared question. It reports whether the redo pass just began and whether the run is finished.
func (r *Run) Next() (startedRedo, done bool) {
	r.Cleared = false
	r.Pos++
	if r.Pos < len(r.queue()) {
		return false, false
	}
	if !r.Redo && len(r.Wrong) > 0 {
		r.Redo, r.Pos = true, 0
		return true, false
	}
	return false, true
}

// Mark returns the progress glyph for main-pass question i.
func (r *Run) Mark(i int) string {
	id := r.IDs[i]
	wrong := slices.Index(r.Wrong, id)
	switch {
	case !r.Redo && i == r.Pos:
		return "●"
	case !r.Redo && i > r.Pos:
		return "○"
	case wrong >= 0 && (!r.Redo || wrong > r.Pos || (wrong == r.Pos && !r.Cleared)):
		return "✗"
	}
	return "✓"
}

// done counts cleared questions in the main pass, for the chapter list.
func (r *Run) done() int {
	if r.Redo {
		return len(r.IDs)
	}
	return r.Pos
}
