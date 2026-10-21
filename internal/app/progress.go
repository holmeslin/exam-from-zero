package app

// LangProgress is everything remembered about one lang.
type LangProgress struct {
	Passed []string        `json:"passed,omitempty"` // chapter keys
	Runs   map[string]*Run `json:"runs,omitempty"`   // unfinished challenges by chapter key
	Last   string          `json:"last,omitempty"`   // chapter of the most recently touched run
}
