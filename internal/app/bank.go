package app

import (
	"fmt"
	"io/fs"
	"path"
	"strings"

	"go.yaml.in/yaml/v3"
)

// Lang is a subject the bank can contain. Order here is menu order.
type Lang struct {
	ID, Name string
	Tool     string // binary that must be on PATH
}

var langs = []Lang{
	{"go", "Go", "go"},
	{"rust", "Rust", "cargo"},
	{"typescript", "TypeScript", "node"},
	{"vue", "Vue", "node"},
	{"react", "React", "node"},
}

type Chapter struct {
	Key     string `yaml:"-"` // yaml file stem, unique within a lang
	Lang    string `yaml:"lang"`
	Chapter string `yaml:"chapter"` // display label: "3", or empty for appendices
	Title   string `yaml:"title"`
	Source  struct {
		Repo string `yaml:"repo"`
		Path string `yaml:"path"`
		SHA  string `yaml:"sha"`
	} `yaml:"source"`
	Sample    int        `yaml:"sample"`
	Questions []Question `yaml:"questions"`
}

type Question struct {
	ID             string   `yaml:"id"`
	Difficulty     int      `yaml:"difficulty"`
	Type           string   `yaml:"type"`  // code | choice | short
	Check          string   `yaml:"check"` // test | stdout (code only)
	Prompt         string   `yaml:"prompt"`
	Stdin          string   `yaml:"stdin"` // fed to the program for check=stdout
	ExpectedStdout string   `yaml:"expected_stdout"`
	Choices        []string `yaml:"choices"`
	Answer         int      `yaml:"answer"`  // 0-based index into Choices
	Answers        []string `yaml:"answers"` // regexes for short questions
	Hints          []string `yaml:"hints"`
	Ref            string   `yaml:"ref"`
}

// UnmarshalYAML starts Answer at -1 so a missing or null answer fails the range check instead of meaning the first choice.
func (q *Question) UnmarshalYAML(n *yaml.Node) error {
	type plain Question // drops this method, avoiding recursion
	p := plain{Answer: -1}
	if err := n.Decode(&p); err != nil {
		return err
	}
	*q = Question(p)
	return nil
}

// Bank holds every chapter, grouped by lang in file-name order.
type Bank struct {
	FS       fs.FS
	Chapters map[string][]*Chapter
	byID     map[string]*Question
}

// LoadBank reads <lang>/<NN-slug>.yaml files; question payloads live in <lang>/<id>/{starter,test,solution}.
func LoadBank(fsys fs.FS) (*Bank, error) {
	files, err := fs.Glob(fsys, "*/*.yaml")
	if err != nil {
		return nil, err
	}
	b := &Bank{FS: fsys, Chapters: map[string][]*Chapter{}, byID: map[string]*Question{}}
	for _, f := range files { // Glob returns lexical order, which is chapter order
		raw, err := fs.ReadFile(fsys, f)
		if err != nil {
			return nil, err
		}
		c := &Chapter{}
		if err := yaml.Unmarshal(raw, c); err != nil {
			return nil, fmt.Errorf("%s: %w", f, err)
		}
		c.Key = strings.TrimSuffix(path.Base(f), ".yaml")
		lang := path.Dir(f)
		if c.Lang != lang {
			return nil, fmt.Errorf("%s: lang %q does not match directory", f, c.Lang)
		}
		b.Chapters[lang] = append(b.Chapters[lang], c)
		for i := range c.Questions {
			b.byID[c.Questions[i].ID] = &c.Questions[i]
		}
	}
	return b, nil
}

func (b *Bank) questionDir(lang, id, part string) string { return path.Join(lang, id, part) }
