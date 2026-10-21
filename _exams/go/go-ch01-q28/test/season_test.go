package main

import (
	"os"
	"path/filepath"
	"testing"
)

// runMain 把 input 當成鍵盤輸入執行 main()，回傳印出的內容。
func runMain(t *testing.T, input string) string {
	t.Helper()
	dir := t.TempDir()
	in, err := os.Create(filepath.Join(dir, "in"))
	if err != nil {
		t.Fatal(err)
	}
	defer in.Close()
	in.WriteString(input)
	in.Seek(0, 0)
	out, err := os.Create(filepath.Join(dir, "out"))
	if err != nil {
		t.Fatal(err)
	}
	defer out.Close()
	oldIn, oldOut := os.Stdin, os.Stdout
	os.Stdin, os.Stdout = in, out
	func() {
		defer func() { os.Stdin, os.Stdout = oldIn, oldOut }()
		main()
	}()
	b, err := os.ReadFile(out.Name())
	if err != nil {
		t.Fatal(err)
	}
	return string(b)
}

func TestSeason(t *testing.T) {
	cases := []struct{ input, want string }{
		{"1", "請輸入月份：\n冬天\n"},
		{"2", "請輸入月份：\n冬天\n"},
		{"3", "請輸入月份：\n春天\n"},
		{"4", "請輸入月份：\n春天\n"},
		{"5", "請輸入月份：\n春天\n"},
		{"6", "請輸入月份：\n夏天\n"},
		{"7", "請輸入月份：\n夏天\n"},
		{"8", "請輸入月份：\n夏天\n"},
		{"9", "請輸入月份：\n秋天\n"},
		{"10", "請輸入月份：\n秋天\n"},
		{"11", "請輸入月份：\n秋天\n"},
		{"12", "請輸入月份：\n冬天\n"},
		{"0", "請輸入月份：\n沒有這個月份\n"},
		{"13", "請輸入月份：\n沒有這個月份\n"},
		{"abc", "請輸入月份：\n請輸入整數\n"},
	}
	for _, c := range cases {
		if got := runMain(t, c.input+"\n"); got != c.want {
			t.Errorf("輸入 %q 時\n印出：%q\n應該是：%q", c.input, got, c.want)
		}
	}
}
