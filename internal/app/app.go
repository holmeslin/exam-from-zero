// Package app is the exam TUI: pick a lang, pick a chapter, answer questions.
package app

import (
	"context"
	"fmt"
	"io/fs"
	"math/rand/v2"
	"os"
	"os/exec"
	"path/filepath"
	"slices"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/textarea"
	"github.com/charmbracelet/bubbles/textinput"
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
	scrRedoIntro
	scrCleared
	scrSetup
)

type model struct {
	cfg   Config
	bank  *Bank
	rng   *rand.Rand
	prog  map[string]*LangProgress
	flags []Flag

	scr     screen
	langs   []Lang          // langs present in the bank
	missing map[string]bool // langs whose toolchain is not on PATH
	langCur int
	chapCur int

	// one-time dependency install for the selected lang
	settingUp bool
	setupOut  string
	setupErr  error

	// reset dialog on the menu
	resetting  bool
	resetInput textinput.Model
	resetMsg   string

	// current challenge
	run         *Run
	q           *Question
	wsDir       string
	grading     bool
	result      *Result
	err         error
	confirmQuit bool
	confirmFlag bool
	choiceCur   int
	editor      textarea.Model // inline editor for the question's main file
	editFile    string         // file the inline editor shows; "" when the question has none
	editSaved   string         // editor content last loaded from / written to editFile
	editing     bool
	hintLevel   int  // hints shown for the current question
	showRef     bool // reference answer expanded
	input       textinput.Model
	clearedRun  *Run // the run that just finished, for the cleared screen

	width   int
	height  int
	out     viewport.Model // scrollable grading output
	saveErr error

	ctx      context.Context // canceled on quit so grading / setup processes die with exam
	cancel   context.CancelFunc
	quitting bool // ctrl+c arrived mid-command; quit once it reports back
}

type editorDoneMsg struct{ err error }

type setupDoneMsg struct {
	out string
	err error
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
	prog, err := loadProgress(cfg.ConfigDir)
	if err != nil {
		return nil, err
	}
	flags, err := loadFlags(cfg.ConfigDir)
	if err != nil {
		return nil, err
	}
	m := &model{
		cfg:   cfg,
		bank:  b,
		rng:   rand.New(rand.NewPCG(cfg.Seed, cfg.Seed)),
		prog:  prog,
		flags: flags,
		out:   viewport.New(0, 0),
	}
	m.ctx, m.cancel = context.WithCancel(context.Background())
	m.input = textinput.New()
	m.input.Prompt = "答案："
	m.editor = textarea.New()
	m.editor.ShowLineNumbers = true
	m.editor.CharLimit = 0
	m.editor.Prompt = ""
	m.resetInput = textinput.New()
	m.resetInput.Prompt = ""
	m.missing = map[string]bool{}
	for _, l := range langs {
		if len(b.Chapters[l.ID]) == 0 {
			continue
		}
		m.langs = append(m.langs, l)
		if _, err := exec.LookPath(l.Tool); err != nil {
			m.missing[l.ID] = true
		}
	}
	m.langCur = m.stepLang(-1, +1) // first usable lang
	return m, nil
}

func (m *model) Init() tea.Cmd { return nil }

func (m *model) lang() Lang           { return m.langs[m.langCur] }
func (m *model) chapters() []*Chapter { return m.bank.Chapters[m.lang().ID] }
func (m *model) chapter() *Chapter    { return m.chapters()[m.chapCur] }

func (m *model) lp() *LangProgress {
	id := m.lang().ID
	if m.prog[id] == nil {
		m.prog[id] = &LangProgress{}
	}
	if m.prog[id].Runs == nil {
		m.prog[id].Runs = map[string]*Run{}
	}
	return m.prog[id]
}

func (m *model) passed(i int) bool { return slices.Contains(m.lp().Passed, m.chapters()[i].Key) }

// unlocked: chapters open strictly in order.
func (m *model) unlocked(i int) bool { return i == 0 || m.passed(i-1) }

func (m *model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case gradedMsg:
		if m.quitting { // killed by quit, not the learner's result
			return m, tea.Quit
		}
		m.grading = false
		m.result, m.err = &msg.res, msg.err
		if msg.err == nil {
			m.record(msg.res)
		}
		m.setOutput(resultBody(msg.res))
		return m, nil
	case editorDoneMsg:
		m.err = msg.err
		if m.editFile != "" {
			m.loadEditor()
		}
	case setupDoneMsg:
		if m.quitting {
			return m, tea.Quit
		}
		m.settingUp, m.setupOut, m.setupErr = false, msg.out, msg.err
		if msg.err == nil {
			m.scr, m.chapCur = scrChapters, 0
		}
	case tea.WindowSizeMsg:
		m.width, m.height = msg.Width, msg.Height
		m.sizeEditor()
	case tea.KeyMsg:
		if msg.String() == "ctrl+c" {
			m.cancel()
			if m.grading || m.settingUp { // wait so the process group is killed and the grading copy removed
				m.quitting = true
				return m, nil
			}
			return m, tea.Quit
		}
		switch m.scr {
		case scrMenu:
			return m.updateMenu(msg)
		case scrChapters:
			return m.updateChapters(msg)
		case scrQuestion:
			return m.updateQuestion(msg)
		case scrRedoIntro:
			if msg.String() == "enter" {
				m.loadQuestion()
			}
		case scrCleared:
			return m.updateCleared(msg)
		case scrSetup:
			switch msg.String() {
			case "enter":
				if !m.settingUp {
					return m, m.startSetup()
				}
			case "esc":
				if !m.settingUp {
					m.scr = scrMenu
				}
			}
		}
	}
	return m, nil
}

func (m *model) langRoot() string { return filepath.Join(m.cfg.DataDir, "workspace", m.lang().ID) }

func (m *model) startSetup() tea.Cmd {
	m.settingUp, m.setupErr, m.setupOut = true, nil, ""
	b, lang, root := m.bank, m.lang().ID, m.langRoot()
	return func() tea.Msg {
		out, err := setupLang(m.ctx, b, lang, root)
		return setupDoneMsg{out, err}
	}
}

// stepLang returns the next lang from i in direction d whose toolchain is available, or i if there is none.
func (m *model) stepLang(i, d int) int {
	for j := i + d; j >= 0 && j < len(m.langs); j += d {
		if !m.missing[m.langs[j].ID] {
			return j
		}
	}
	return max(i, 0)
}

func (m *model) allPassed(lang string) bool {
	lp := m.prog[lang]
	return lp != nil && !slices.ContainsFunc(m.bank.Chapters[lang], func(c *Chapter) bool { return !slices.Contains(lp.Passed, c.Key) })
}

// archiveDir is where a reset moves the old workspace; it never overwrites an earlier archive.
func (m *model) archiveDir(lang string) string {
	base := filepath.Join(m.cfg.DataDir, "workspace", lang+".bak-"+time.Now().Format("2006-01-02"))
	p := base
	for i := 2; ; i++ {
		if _, err := os.Stat(p); os.IsNotExist(err) {
			return p
		}
		p = fmt.Sprintf("%s-%d", base, i)
	}
}

func (m *model) reset() {
	lang := m.lang().ID
	ws := filepath.Join(m.cfg.DataDir, "workspace", lang)
	if _, err := os.Stat(ws); err == nil {
		if err := os.Rename(ws, m.archiveDir(lang)); err != nil {
			m.resetMsg = "封存失敗：" + err.Error()
			return
		}
	}
	delete(m.prog, lang)
	m.save()
	m.resetting = false
}

func (m *model) updateMenu(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	if m.resetting {
		switch msg.String() {
		case "enter":
			if m.resetInput.Value() == m.lang().ID {
				m.reset()
			} else {
				m.resetMsg = "名稱不符"
				m.resetInput.Reset()
			}
		case "esc":
			m.resetting = false
		default:
			var cmd tea.Cmd
			m.resetInput, cmd = m.resetInput.Update(msg)
			return m, cmd
		}
		return m, nil
	}
	switch msg.String() {
	case "up", "k":
		m.langCur = m.stepLang(m.langCur, -1)
	case "down", "j":
		m.langCur = m.stepLang(m.langCur, +1)
	case "enter":
		switch {
		case m.missing[m.lang().ID]:
		case !langReady(m.lang().ID, m.langRoot()):
			m.scr = scrSetup
			return m, m.startSetup()
		default:
			m.scr, m.chapCur = scrChapters, 0
		}
	case "R":
		if m.allPassed(m.lang().ID) {
			m.resetting, m.resetMsg = true, ""
			m.resetInput.Reset()
			m.resetInput.Focus()
		}
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
		if m.chapCur+1 < len(m.chapters()) && m.unlocked(m.chapCur+1) {
			m.chapCur++
		}
	case "enter":
		m.enterChapter()
	case "esc":
		m.scr = scrMenu
	}
	return m, nil
}

// enterChapter resumes the chapter's unfinished run, or samples a new one.
func (m *model) enterChapter() {
	c, lp := m.chapter(), m.lp()
	// a saved run may name questions the bank has since dropped; resample instead of crashing
	if r := lp.Runs[c.Key]; r != nil && slices.ContainsFunc(r.IDs, func(id string) bool { return m.bank.byID[id] == nil }) {
		delete(lp.Runs, c.Key)
	}
	if lp.Runs[c.Key] == nil {
		lp.Runs[c.Key] = newRun(c, m.rng, m.flagged)
	}
	m.run, lp.Last = lp.Runs[c.Key], c.Key
	if len(m.run.IDs) == 0 { // every question in the chapter was flagged: nothing to answer, so it must not block progress
		m.advance(false, true)
		return
	}
	m.save()
	m.loadQuestion()
}

// record applies a grading outcome to the run and the question's stats, then persists.
func (m *model) record(res Result) {
	m.run.Record(res.Pass())
	st := m.lp().stat(m.q.ID)
	st.Attempts++
	st.Status, st.Last = "wrong", time.Now()
	if res.Pass() {
		st.Status = "correct"
	}
	m.save()
}

// manifests are never what the learner should edit first.
var manifests = []string{"Cargo.toml", "Cargo.lock", "go.mod", "package.json"}

// mainFile is the workspace copy of the question's first starter source file.
func (m *model) mainFile() string {
	file := m.wsDir
	starter := m.bank.questionDir(m.lang().ID, m.q.ID, "starter")
	_ = fs.WalkDir(m.bank.FS, starter, func(p string, d fs.DirEntry, err error) error {
		if err == nil && !d.IsDir() && !slices.Contains(manifests, d.Name()) {
			file = filepath.Join(m.wsDir, strings.TrimPrefix(p, starter+"/"))
			return fs.SkipAll
		}
		return err
	})
	return file
}

// openEditor suspends the TUI and edits the question's main file.
func (m *model) openEditor() tea.Cmd {
	file := m.mainFile()
	argv := editorCommand()
	cmd := exec.Command(argv[0], append(argv[1:], file)...)
	cmd.Dir = m.wsDir
	return tea.ExecProcess(cmd, func(err error) tea.Msg { return editorDoneMsg{err} })
}

// editorCommand: $VISUAL, then $EDITOR (may carry flags), then VS Code, then vim.
func editorCommand() []string {
	for _, env := range []string{"VISUAL", "EDITOR"} {
		if f := strings.Fields(os.Getenv(env)); len(f) > 0 {
			return f
		}
	}
	if _, err := exec.LookPath("code"); err == nil {
		return []string{"code", "--wait"}
	}
	return []string{"vim"}
}

func (m *model) showHint() {
	if m.hintLevel >= len(m.q.Hints) {
		return
	}
	m.hintLevel++
	m.lp().stat(m.q.ID).Hinted = true
	if !slices.Contains(m.run.Hinted, m.q.ID) {
		m.run.Hinted = append(m.run.Hinted, m.q.ID)
	}
	m.save()
}

func (m *model) save() { m.saveErr = saveProgress(m.cfg.ConfigDir, m.prog) }

func (m *model) loadQuestion() {
	m.scr, m.confirmQuit = scrQuestion, false
	m.q = m.bank.byID[m.run.Current()]
	m.result, m.err, m.choiceCur, m.hintLevel, m.showRef = nil, nil, 0, 0, false
	m.input.Reset()
	m.input.Focus()
	if m.run.Cleared {
		m.result = &Result{Kind: KindPass}
	}
	m.editing, m.editFile = false, ""
	if m.q.Type == "code" {
		m.wsDir, m.err = prepareWorkspace(m.bank, m.cfg.DataDir, m.lang().ID, m.q)
		m.editFile = m.mainFile()
		m.loadEditor()
	}
}

// loadEditor shows the file's current content, picking up edits made in other editors.
func (m *model) loadEditor() {
	raw, err := os.ReadFile(m.editFile)
	if err != nil {
		m.editFile = ""
		return
	}
	m.editor.SetValue(string(raw))
	m.editSaved = m.editor.Value() // textarea normalizes (e.g. tabs), so compare against what it holds, not the raw file
	m.sizeEditor()
}

// syncEditor writes inline edits back, or reloads the file when the editor was not touched so an IDE edit is never overwritten.
func (m *model) syncEditor() error {
	if m.editFile == "" {
		return nil
	}
	if v := m.editor.Value(); v != m.editSaved {
		if err := os.WriteFile(m.editFile, []byte(v), 0o644); err != nil {
			return err
		}
		m.editSaved = v
		return nil
	}
	m.loadEditor()
	return nil
}

func (m *model) sizeEditor() {
	m.editor.SetWidth(max(m.width-8, 20))
	m.editor.SetHeight(min(max(strings.Count(m.editor.Value(), "\n")+2, 5), 20, m.paneMax(2)))
}

// paneMax caps a scrolling pane at 1/div of the terminal (it is unknown until the first resize) so the question view fits.
func (m *model) paneMax(div int) int {
	if m.height == 0 {
		return 20
	}
	return max(m.height/div-2, 3)
}

func (m *model) startGrading() tea.Cmd {
	if err := m.syncEditor(); err != nil { // grading now would test the old file and drop the edits
		m.err = err
		return nil
	}
	m.editing = false
	m.editor.Blur()
	m.grading, m.result, m.err = true, nil, nil
	b, lang, q, dir := m.bank, m.lang().ID, m.q, m.wsDir
	return func() tea.Msg {
		res, err := gradeCode(m.ctx, b, lang, q, dir)
		return gradedMsg{res, err}
	}
}

func (m *model) updateQuestion(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	// while grading only scrolling is allowed: leaving, flagging or editing would race the pending result
	if m.grading && msg.String() != "pgup" && msg.String() != "pgdown" {
		return m, nil
	}
	if m.confirmFlag {
		switch msg.String() {
		case "y":
			m.confirmFlag = false
			m.flag()
		case "n", "esc":
			m.confirmFlag = false
		}
		return m, nil
	}
	if m.editing {
		switch msg.String() {
		case "esc":
			if err := m.syncEditor(); err != nil {
				m.err = err
				return m, nil
			}
			m.editing = false
			m.editor.Blur()
		case "ctrl+s":
			return m, m.startGrading()
		default:
			var cmd tea.Cmd
			m.editor, cmd = m.editor.Update(msg)
			m.sizeEditor()
			return m, cmd
		}
		return m, nil
	}
	if m.confirmQuit {
		switch msg.String() {
		case "y":
			m.scr = scrChapters
		case "n", "esc":
			m.confirmQuit = false
		}
		return m, nil
	}
	short := m.q.Type == "short" && !m.run.Cleared
	switch k := msg.String(); {
	case k == "tab" && m.q.Type == "short", k == "h" && !short:
		m.showHint()
		return m, nil
	case k == "ctrl+f" && m.q.Type == "short", k == "!" && !short:
		m.confirmFlag = true
		return m, nil
	case k == "tab" && m.editFile != "" && !m.run.Cleared:
		if err := m.syncEditor(); err != nil {
			m.err = err
			return m, nil
		}
		m.editing = true
		return m, m.editor.Focus()
	case k == "e" && m.q.Type == "code":
		if err := m.syncEditor(); err != nil { // the editor would open the old file and its reload would drop the edits
			m.err = err
			return m, nil
		}
		return m, m.openEditor()
	case k == "r" && m.run.Cleared:
		m.showRef = !m.showRef
		return m, nil
	}
	switch msg.String() {
	case "pgup", "pgdown":
		var cmd tea.Cmd
		m.out, cmd = m.out.Update(msg)
		return m, cmd
	case "up", "down":
		if m.q.Type == "choice" && !m.run.Cleared {
			if msg.String() == "up" {
				m.choiceCur = max(m.choiceCur-1, 0)
			} else {
				m.choiceCur = min(m.choiceCur+1, len(m.q.Choices)-1)
			}
			return m, nil
		}
	case "enter":
		if m.run.Cleared {
			m.next()
			return m, nil
		}
		if m.q.Type != "code" {
			res := gradeAnswer(m.q, m.choiceCur, m.input.Value())
			m.result, m.err = &res, nil
			m.record(res)
			m.setOutput("")
			return m, nil
		}
		return m, m.startGrading()
	case "esc":
		m.confirmQuit = true
		return m, nil
	}
	if short {
		var cmd tea.Cmd
		m.input, cmd = m.input.Update(msg)
		return m, cmd
	}
	return m, nil
}

func (m *model) flagged(id string) bool {
	return slices.ContainsFunc(m.flags, func(f Flag) bool { return f.Lang == m.lang().ID && f.ID == id })
}

// flag reports the current question as broken and swaps in an unused, unflagged one from the chapter.
func (m *model) flag() {
	id := m.q.ID
	m.flags = append(m.flags, Flag{Lang: m.lang().ID, ID: id, Time: time.Now()})
	if err := writeJSON(flagsPath(m.cfg.ConfigDir), m.flags); err != nil { // keep the question, or it would come back after a restart
		m.flags = m.flags[:len(m.flags)-1]
		m.err = fmt.Errorf("檢舉未儲存：%w", err)
		return
	}
	replacement := ""
	var spare []string
	for _, q := range m.chapter().Questions {
		if !slices.Contains(m.run.IDs, q.ID) && !m.flagged(q.ID) {
			spare = append(spare, q.ID)
		}
	}
	if len(spare) > 0 {
		replacement = spare[m.rng.IntN(len(spare))]
	}
	m.advance(m.run.Drop(replacement, func(id string) int { return m.bank.byID[id].Difficulty }))
}

func (m *model) next() { m.advance(m.run.Next()) }

// advance moves on after the run's position changed: next question, redo intro, or chapter cleared.
func (m *model) advance(startedRedo, done bool) {
	defer m.save()
	switch {
	case done:
		lp, key := m.lp(), m.chapter().Key
		if !slices.Contains(lp.Passed, key) {
			lp.Passed = append(lp.Passed, key)
		}
		delete(lp.Runs, key)
		m.clearedRun, m.scr = m.run, scrCleared
	case startedRedo:
		for _, id := range m.run.Wrong {
			if q := m.bank.byID[id]; q.Type == "code" {
				if err := resetWorkspace(m.bank, m.cfg.DataDir, m.lang().ID, q); err != nil {
					m.err = err
				}
			}
		}
		m.scr = scrRedoIntro
	default:
		m.loadQuestion()
	}
}

func (m *model) updateCleared(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "enter":
		if m.chapCur+1 < len(m.chapters()) {
			m.chapCur++
			m.enterChapter()
		} else {
			m.scr = scrChapters
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
	s := m.screen()
	if m.saveErr != nil { // saves happen on every screen, so the failure must show on every screen
		s += "\n" + badStyle.Render("  進度儲存失敗：") + m.saveErr.Error()
	}
	return s
}

func (m *model) screen() string {
	switch m.scr {
	case scrChapters:
		return m.viewChapters()
	case scrQuestion:
		return m.viewQuestion()
	case scrRedoIntro:
		return m.viewRedoIntro()
	case scrCleared:
		return m.viewCleared()
	case scrSetup:
		return m.viewSetup()
	}
	return m.viewMenu()
}

func cursor(on bool) string {
	if on {
		return "▶ "
	}
	return "  "
}

// pad right-pads s to display width w (CJK-aware).
func pad(s string, w int) string {
	return s + strings.Repeat(" ", max(w-lipgloss.Width(s), 0))
}

func help(s string) string { return "\n" + helpStyle.Render("  "+s) }

func (m *model) viewMenu() string {
	var s strings.Builder
	s.WriteString(titleStyle.Render("exam-from-zero\n你真的學會了嗎？") + "\n\n  選擇今天要測驗的語言\n\n")
	for i, l := range m.langs {
		chs, lp := m.bank.Chapters[l.ID], m.prog[l.ID]
		done, status := 0, ""
		if !langReady(l.ID, filepath.Join(m.cfg.DataDir, "workspace", l.ID)) {
			status = "⚙ 首次進入將安裝依賴"
		}
		if m.allPassed(l.ID) {
			done, status = len(chs), "✓ 全部過關"
		} else if lp != nil {
			done = len(lp.Passed)
			idx := slices.IndexFunc(chs, func(c *Chapter) bool { return c.Key == lp.Last })
			if run := lp.Runs[lp.Last]; run != nil && idx >= 0 {
				status = fmt.Sprintf("▸ 第 %s 關進行中 (%d/%d)", chapterLabel(chs[idx]), run.done(), len(run.IDs))
			}
		}
		row := fmt.Sprintf("%s %s  %3d/%-3d %s", pad(l.Name, 12), bar(done, len(chs)), done, len(chs), status)
		if m.missing[l.ID] {
			row = helpStyle.Render(fmt.Sprintf("%s %s  %3d/%-3d ✗ 缺少 %s", pad(l.Name, 12), bar(done, len(chs)), done, len(chs), l.Tool))
		}
		fmt.Fprintf(&s, "  %s%s\n", cursor(i == m.langCur), row)
	}
	if m.resetting {
		l := m.lang()
		body := fmt.Sprintf("所有進度將清除，workspace 會封存為\n%s\n\n輸入 %s 以確認：%s",
			tildePath(m.archiveDir(l.ID)), l.ID, m.resetInput.View())
		if m.resetMsg != "" {
			body += "\n" + badStyle.Render(m.resetMsg)
		}
		s.WriteString("\n  重置 " + l.Name + "\n" + boxStyle.Render(body+"\n\nenter 確認   esc 取消"))
		return s.String()
	}
	s.WriteString(help("↑/↓ 選擇   enter 進入   R 重置（僅限全部過關）   q 離開"))
	return s.String()
}

func chapterLabel(c *Chapter) string {
	if c.Chapter == "" {
		return "-"
	}
	return c.Chapter
}

func (m *model) viewChapters() string {
	var s strings.Builder
	header := fmt.Sprintf("%s   %d/%d 過關", m.lang().Name, len(m.lp().Passed), len(m.chapters()))
	s.WriteString(titleStyle.Render(header) + "\n\n")
	fmt.Fprintf(&s, "    %3s  %s  %s  %s\n", "#", pad("關卡", 36), "題數", "狀態")
	for i, c := range m.chapters() {
		status := ""
		switch run := m.lp().Runs[c.Key]; {
		case run != nil:
			status = fmt.Sprintf("▸ 進行中 %d/%d", run.done(), len(run.IDs))
		case m.passed(i):
			status = "✓"
		case !m.unlocked(i):
			status = "🔒"
		}
		fmt.Fprintf(&s, "  %s%3s  %s  %4d  %s\n", cursor(i == m.chapCur), chapterLabel(c), pad(c.Title, 36), c.Sample, status)
	}
	s.WriteString(help("↑/↓ 選擇   enter 進入／接續   esc 回主選單"))
	return s.String()
}

func bar(done, total int) string {
	const w = 18
	n := 0
	if total > 0 {
		n = done * w / total
	}
	return strings.Repeat("█", n) + strings.Repeat("░", w-n)
}

func stars(d int) string { return strings.Repeat("★", d) + strings.Repeat("☆", max(3-d, 0)) }

func (m *model) viewQuestion() string {
	c, r := m.chapter(), m.run
	pos := fmt.Sprintf("第 %d/%d 題", r.Pos+1, len(r.IDs))
	if r.Redo {
		pos = fmt.Sprintf("重做 %d/%d", r.Pos+1, len(r.Wrong))
	}
	var s strings.Builder
	s.WriteString(helpStyle.Render(fmt.Sprintf("%s › %s %s", m.lang().Name, chapterLabel(c), c.Title)) +
		"   " + pos + " " + stars(m.q.Difficulty) + "\n")
	body := strings.TrimRight(m.q.Prompt, "\n")
	switch m.q.Type {
	case "code":
		body += "\n\n📁 " + tildePath(m.wsDir)
	case "choice":
		body += "\n"
		for i, c := range m.q.Choices {
			mark := "( )"
			if i == m.choiceCur {
				mark = "(•)"
			}
			body += fmt.Sprintf("\n%s%s %s", cursor(i == m.choiceCur), mark, c)
		}
	case "short":
		body += "\n\n" + m.input.View()
	}
	s.WriteString(m.box(body) + "\n")
	if m.editFile != "" {
		state := "（tab 編輯）"
		if m.editing {
			state = " ✎ 編輯中"
		}
		s.WriteString(m.titledBox(filepath.Base(m.editFile)+state, m.editor.View()) + "\n")
	}
	switch {
	case m.grading:
		s.WriteString("  ⏳ 執行中…\n")
	case m.err != nil:
		s.WriteString(badStyle.Render("  錯誤：") + m.err.Error() + "\n")
	case m.result != nil:
		s.WriteString(m.viewResult(*m.result))
	}
	if m.hintLevel > 0 {
		s.WriteString(m.titledBox(fmt.Sprintf("💡 提示 %d/%d", m.hintLevel, len(m.q.Hints)),
			strings.Join(m.q.Hints[:m.hintLevel], "\n")+"\n📖 "+m.q.Ref) + "\n")
	}
	if m.showRef {
		s.WriteString(m.titledBox("參考答案", m.refAnswer()) + "\n")
	}
	s.WriteString("  進度  " + m.progressRow() + "\n")
	hintKey := "h"
	if m.q.Type == "short" {
		hintKey = "tab"
	}
	flagKey := "!"
	if m.q.Type == "short" {
		flagKey = "ctrl+f"
	}
	switch {
	case m.confirmFlag:
		s.WriteString("\n  確定檢舉這題有問題？會換一題並不再出現  y 檢舉   n 取消")
	case m.confirmQuit:
		s.WriteString("\n  確定離開？進度會保留  y 離開   n 繼續作答")
	case m.editing:
		s.WriteString(help("esc 離開編輯   ctrl+s 存檔並判定"))
	case r.Cleared:
		s.WriteString(help("enter 下一題   r 參考答案   esc 離開"))
	case m.q.Type == "choice":
		s.WriteString(help("↑/↓ 選擇   enter 送出   " + hintKey + " 提示   " + flagKey + " 檢舉   esc 離開"))
	case m.q.Type == "short":
		s.WriteString(help("enter 送出   " + hintKey + " 提示   " + flagKey + " 檢舉   esc 離開"))
	default:
		s.WriteString(help("tab 編輯   e 開編輯器   enter 判定   " + hintKey + " 提示   " + flagKey + " 檢舉   esc 離開"))
	}
	return s.String()
}

func (m *model) progressRow() string {
	r := m.run
	marks := make([]string, len(r.IDs))
	for i := range r.IDs {
		marks[i] = r.Mark(i)
	}
	row := strings.Join(marks, " ")
	if r.Redo {
		row += "   重做 ●"
	}
	return row
}

func (m *model) viewSetup() string {
	name := m.lang().Name
	if m.settingUp {
		return m.box(fmt.Sprintf("⚙ 安裝 %s 依賴中…（%s，第一次需要一點時間）", name, strings.Join(runners[m.lang().ID].setup, " ")))
	}
	body := badStyle.Render("✗ 安裝失敗") + "：" + m.setupErr.Error()
	if out := strings.TrimSpace(m.setupOut); out != "" {
		lines := strings.Split(out, "\n")
		body += "\n\n" + strings.Join(lines[max(len(lines)-maxOutputLines, 0):], "\n") // npm errors end with the useful part
	}
	return m.box(body) + help("enter 重試   esc 返回")
}

func (m *model) viewRedoIntro() string {
	var nums []string
	for _, id := range m.run.Wrong {
		nums = append(nums, fmt.Sprint(slices.Index(m.run.IDs, id)+1))
	}
	body := fmt.Sprintf("⟲ 第 %s 題你曾答錯，workspace 已重設為 starter，\n  請從頭再寫一次。", strings.Join(nums, "、"))
	return m.box(body) + "\n  進度  " + m.progressRow() + "\n" + help("enter 開始")
}

func (m *model) viewCleared() string {
	c, r := m.chapter(), m.clearedRun
	body := fmt.Sprintf("🎉  第 %s 關「%s」過關\n\n答對 %d/%d   曾錯 %d   看過提示 %d", chapterLabel(c), c.Title, len(r.IDs), len(r.IDs), len(r.Wrong), len(r.Hinted))
	if m.chapCur+1 < len(m.chapters()) {
		n := m.chapters()[m.chapCur+1]
		body += fmt.Sprintf("\n🔓 已解鎖：第 %s 關 %s", chapterLabel(n), n.Title)
		return m.box(body) + help("enter 下一關   esc 回關卡清單")
	}
	return m.box(body+"\n\n✓ 全部過關") + help("esc 回關卡清單")
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
	m.out.Height = min(lines, maxOutputLines, m.paneMax(4))
	m.out.SetContent(body)
	m.out.GotoTop()
}

func (m *model) titledBox(title, content string) string {
	return "  " + title + "\n" + m.box(content)
}

// refAnswer renders the solution: code files for code questions, the right option or accepted patterns otherwise.
func (m *model) refAnswer() string {
	switch m.q.Type {
	case "choice":
		return "正確答案：" + m.q.Choices[m.q.Answer]
	case "short":
		return "可接受答案（regex）：\n" + strings.Join(m.q.Answers, "\n")
	}
	dir := m.bank.questionDir(m.lang().ID, m.q.ID, "solution")
	var s strings.Builder
	err := fs.WalkDir(m.bank.FS, dir, func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		raw, err := fs.ReadFile(m.bank.FS, p)
		fmt.Fprintf(&s, "── %s ──\n%s\n", strings.TrimPrefix(p, dir+"/"), raw)
		return err
	})
	if err != nil {
		return err.Error()
	}
	return strings.TrimRight(s.String(), "\n")
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
