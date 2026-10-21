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
	Cleared bool     `json:"cleared,omitzero"`  // current question passed, waiting for "next"
	Hinted  []string `json:"hinted,omitempty"`  // questions whose hints were opened in this run
	Chapter string   `json:"chapter,omitempty"` // hash of the chapter file the run was sampled from
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

// Drop removes the current question (reported broken). replacement, if any, takes its place.
func (r *Run) Drop(replacement string, difficulty func(id string) int) (startedRedo, done bool) {
	id := r.Current()
	is := func(s string) bool { return s == id }
	r.Hinted = slices.DeleteFunc(r.Hinted, is)
	i := slices.Index(r.IDs, id)
	r.IDs = slices.Delete(r.IDs, i, i+1)
	if r.Redo {
		r.Wrong = slices.Delete(r.Wrong, r.Pos, r.Pos+1)
		if replacement != "" { // never attempted, so it must be answered in this redo pass
			r.IDs = slices.Insert(r.IDs, i, replacement)
			r.Wrong = slices.Insert(r.Wrong, r.Pos, replacement)
		}
	} else {
		r.Wrong = slices.DeleteFunc(r.Wrong, is)
		if replacement != "" {
			r.IDs = slices.Insert(r.IDs, r.Pos, replacement)
			slices.SortStableFunc(r.IDs[r.Pos:], func(a, b string) int { return cmp.Compare(difficulty(a), difficulty(b)) })
		}
	}
	r.Pos-- // Next steps back onto this position, or past the end
	return r.Next()
}
