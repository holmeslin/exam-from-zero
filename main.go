// Command exam is a TUI quiz over the learning-*-from-zero books.
package main

import (
	"context"
	"embed"
	"fmt"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"time"

	tea "github.com/charmbracelet/bubbletea"

	"github.com/holmeslin/exam-from-zero/internal/app"
)

// `_` prefix keeps the question payloads (.go files) out of `go build ./...`.
//
//go:embed all:_exams
var exams embed.FS

func main() {
	bank, _ := fs.Sub(exams, "_exams")
	if err := run(bank, os.Args[1:], os.Stdout); err != nil {
		fmt.Fprintln(os.Stderr, "exam:", err)
		os.Exit(1)
	}
}

func run(bank fs.FS, args []string, out io.Writer) error {
	if len(args) > 0 && args[0] == "verify" {
		lang := ""
		if len(args) > 1 {
			lang = args[1]
		}
		return app.Verify(context.Background(), bank, lang, out)
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return err
	}
	m, err := app.New(app.Config{
		Bank:      bank,
		ConfigDir: xdg("XDG_CONFIG_HOME", filepath.Join(home, ".config")),
		DataDir:   xdg("XDG_DATA_HOME", filepath.Join(home, ".local", "share")),
		Seed:      uint64(time.Now().UnixNano()),
	})
	if err != nil {
		return err
	}
	_, err = tea.NewProgram(m, tea.WithAltScreen()).Run()
	return err
}

func xdg(env, fallback string) string {
	if v := os.Getenv(env); v != "" {
		return filepath.Join(v, "exam-from-zero")
	}
	return filepath.Join(fallback, "exam-from-zero")
}
