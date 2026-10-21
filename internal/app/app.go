// Package app is the exam TUI: pick a lang, pick a chapter, answer questions.
package app

import (
	"context"
	"fmt"
	"io/fs"
	"os"
	"strings"

	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type Config struct {
	Bank      fs.FS
	ConfigDir string // progress and flagged files
	DataDir   string // workspaces
	Seed      uint64
}

type screen int

const (
	scrMenu screen = iota
	scrChapters
	scrQuestion
)

type model struct {
	cfg  Config
	bank *Bank

	scr     screen
	langs   []Lang // langs present in the bank
	langCur int
	chapCur int
	q       *Question
	wsDir   string
	grading bool
	result  *Result
	err     error
	width   int
	out     viewport.Model // scrollable grading output
}

type gradedMsg struct {
	res Result
	err error
}

func New(cfg Config) (tea.Model, error) {
	b, err := LoadBank(cfg.Bank)
	if err != nil {
		return nil, err
	}
	m := &model{cfg: cfg, bank: b, out: viewport.New(0, 0)}
	for _, l := range langs {
		if len(b.Chapters[l.ID]) > 0 {
			m.langs = append(m.langs, l)
		}
	}
	return m, nil
}

func (m *model) Init() tea.Cmd { return nil }

func (m *model) lang() Lang           { return m.langs[m.langCur] }
func (m *model) chapters() []*Chapter { return m.bank.Chapters[m.lang().ID] }

func (m *model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case gradedMsg:
		m.grading = false
		m.result, m.err = &msg.res, msg.err
		m.setOutput(resultBody(msg.res))
		return m, nil
	case tea.WindowSizeMsg:
		m.width = msg.Width
	case tea.KeyMsg:
		if msg.String() == "ctrl+c" {
			return m, tea.Quit
		}
		switch m.scr {
		case scrMenu:
			return m.updateMenu(msg)
		case scrChapters:
			return m.updateChapters(msg)
		case scrQuestion:
			return m.updateQuestion(msg)
		}
	}
	return m, nil
}

func (m *model) updateMenu(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "up", "k":
		m.langCur = max(m.langCur-1, 0)
	case "down", "j":
		m.langCur = min(m.langCur+1, len(m.langs)-1)
	case "enter":
		m.scr, m.chapCur = scrChapters, 0
	case "q":
		return m, tea.Quit
	}
	return m, nil
}

func (m *model) updateChapters(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "up", "k":
		m.chapCur = max(m.chapCur-1, 0)
	case "down", "j":
		m.chapCur = min(m.chapCur+1, len(m.chapters())-1)
	case "enter":
		c := m.chapters()[m.chapCur]
		m.q = &c.Questions[0]
		m.result, m.err = nil, nil
		m.wsDir, m.err = prepareWorkspace(m.bank, m.cfg.DataDir, m.lang().ID, m.q)
		m.scr = scrQuestion
	case "esc":
		m.scr = scrMenu
	}
	return m, nil
}

func (m *model) updateQuestion(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "pgup", "pgdown":
		var cmd tea.Cmd
		m.out, cmd = m.out.Update(msg)
		return m, cmd
	case "enter":
		if m.grading {
			return m, nil
		}
		m.grading, m.result, m.err = true, nil, nil
		b, lang, q, dir := m.bank, m.lang().ID, m.q, m.wsDir
		return m, func() tea.Msg {
			res, err := gradeCode(context.Background(), b, lang, q, dir)
			return gradedMsg{res, err}
		}
	case "esc":
		m.scr = scrChapters
	}
	return m, nil
}

var (
	titleStyle = lipgloss.NewStyle().Bold(true).Border(lipgloss.RoundedBorder()).Padding(0, 2)
	boxStyle   = lipgloss.NewStyle().Border(lipgloss.RoundedBorder()).Padding(0, 2)
	helpStyle  = lipgloss.NewStyle().Faint(true)
	okStyle    = lipgloss.NewStyle().Foreground(lipgloss.Color("2")).Bold(true)
	badStyle   = lipgloss.NewStyle().Foreground(lipgloss.Color("1")).Bold(true)
)

func (m *model) View() string {
	switch m.scr {
	case scrChapters:
		return m.viewChapters()
	case scrQuestion:
		return m.viewQuestion()
	}
	return m.viewMenu()
}

func cursor(on bool) string {
	if on {
		return "▶ "
	}
	return "  "
}

func (m *model) viewMenu() string {
	var s strings.Builder
	s.WriteString(titleStyle.Render("exam-from-zero\n你真的學會了嗎？") + "\n\n  選擇今天要測驗的語言\n\n")
	for i, l := range m.langs {
		fmt.Fprintf(&s, "  %s%s\n", cursor(i == m.langCur), l.Name)
	}
	s.WriteString("\n" + helpStyle.Render("  ↑/↓ 選擇   enter 進入   q 離開"))
	return s.String()
}

func (m *model) viewChapters() string {
	var s strings.Builder
	s.WriteString(titleStyle.Render(m.lang().Name) + "\n\n")
	for i, c := range m.chapters() {
		fmt.Fprintf(&s, "  %s%3s  %s\n", cursor(i == m.chapCur), cmpOrDash(c.Chapter), c.Title)
	}
	s.WriteString("\n" + helpStyle.Render("  ↑/↓ 選擇   enter 進入   esc 回主選單"))
	return s.String()
}

func cmpOrDash(s string) string {
	if s == "" {
		return "-"
	}
	return s
}

func (m *model) viewQuestion() string {
	c := m.chapters()[m.chapCur]
	var body strings.Builder
	body.WriteString(strings.TrimRight(m.q.Prompt, "\n") + "\n\n📁 " + tildePath(m.wsDir))
	var s strings.Builder
	s.WriteString(helpStyle.Render(fmt.Sprintf("%s › %s %s", m.lang().Name, cmpOrDash(c.Chapter), c.Title)) + "\n")
	s.WriteString(m.box(body.String()) + "\n")
	switch {
	case m.grading:
		s.WriteString("  ⏳ 執行中…\n")
	case m.err != nil:
		s.WriteString(badStyle.Render("  錯誤：") + m.err.Error() + "\n")
	case m.result != nil:
		s.WriteString(m.viewResult(*m.result))
	}
	s.WriteString("\n" + helpStyle.Render("  enter 判定   esc 離開"))
	return s.String()
}

// box wraps content to the terminal so long lines are not truncated by the renderer.
func (m *model) box(content string) string {
	if m.width > 4 {
		return boxStyle.Width(m.width - 2).Render(content)
	}
	return boxStyle.Render(content)
}

func tildePath(p string) string {
	if home, err := os.UserHomeDir(); err == nil {
		if rest, ok := strings.CutPrefix(p, home); ok {
			return "~" + rest
		}
	}
	return p
}

var resultTitles = map[string]string{
	KindTest:    "✗ 測試失敗",
	KindCompile: "✗ 編譯錯誤",
	KindStdout:  "✗ 輸出不符",
	KindTimeout: "⏱ 逾時",
	KindWrong:   "✗ 答錯",
}

func (m *model) viewResult(r Result) string {
	if r.Pass() {
		return okStyle.Render("  ✓ 通過") + "\n"
	}
	s := badStyle.Render("  "+resultTitles[r.Kind]) + "\n"
	if m.out.TotalLineCount() > 0 && resultBody(r) != "" {
		s += m.box(m.out.View()) + "\n"
		if !m.out.AtTop() || !m.out.AtBottom() {
			s += helpStyle.Render("  pgup/pgdn 捲動輸出") + "\n"
		}
	}
	return s
}

func resultBody(r Result) string {
	if r.Kind == KindStdout {
		return "預期：\n" + r.Expected + "\n實際：\n" + r.Output
	}
	return strings.TrimRight(r.Output, "\n")
}

const maxOutputLines = 15

// setOutput loads grading output into the viewport, capped so long compiler errors scroll instead of overflowing.
func (m *model) setOutput(body string) {
	lines := strings.Count(body, "\n") + 1
	m.out.Width = max(m.width-6, 20)
	m.out.Height = min(lines, maxOutputLines)
	m.out.SetContent(body)
	m.out.GotoTop()
}
