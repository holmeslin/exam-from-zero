package app

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"time"
)

// LangProgress is everything remembered about one lang.
type LangProgress struct {
	Passed    []string          `json:"passed,omitempty"`    // chapter keys
	Runs      map[string]*Run   `json:"runs,omitempty"`      // unfinished challenges by chapter key
	Last      string            `json:"last,omitempty"`      // chapter of the most recently touched run
	Questions map[string]*QStat `json:"questions,omitempty"` // by question id
}

type QStat struct {
	Status   string    `json:"status"` // last outcome: correct | wrong
	Attempts int       `json:"attempts"`
	Hinted   bool      `json:"hinted,omitzero"`
	Last     time.Time `json:"last"`
}

func progressPath(configDir string) string { return filepath.Join(configDir, "progress.json") }

// loadProgress returns empty progress when the file does not exist yet; a corrupt file is an error so it never gets overwritten.
func loadProgress(configDir string) (map[string]*LangProgress, error) {
	p := progressPath(configDir)
	raw, err := os.ReadFile(p)
	if errors.Is(err, fs.ErrNotExist) {
		return map[string]*LangProgress{}, nil
	}
	if err != nil {
		return nil, err
	}
	var prog map[string]*LangProgress
	if err := json.Unmarshal(raw, &prog); err != nil {
		return nil, fmt.Errorf("進度檔 %s 損毀，請修復或移走後再啟動：%w", p, err)
	}
	return prog, nil
}

// saveProgress writes via a temp file + rename so a crash mid-write cannot corrupt existing progress.
func saveProgress(configDir string, prog map[string]*LangProgress) error {
	raw, err := json.MarshalIndent(prog, "", "  ")
	if err != nil {
		return err
	}
	if err := os.MkdirAll(configDir, 0o755); err != nil {
		return err
	}
	tmp, err := os.CreateTemp(configDir, "progress-*.json")
	if err != nil {
		return err
	}
	defer os.Remove(tmp.Name())
	if _, err := tmp.Write(raw); err != nil {
		tmp.Close()
		return err
	}
	if err := tmp.Close(); err != nil {
		return err
	}
	return os.Rename(tmp.Name(), progressPath(configDir))
}

func (lp *LangProgress) stat(id string) *QStat {
	if lp.Questions == nil {
		lp.Questions = map[string]*QStat{}
	}
	if lp.Questions[id] == nil {
		lp.Questions[id] = &QStat{}
	}
	return lp.Questions[id]
}
