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

func TestParking(t *testing.T) {
	cases := []struct{ input, want string }{
		{"5", "請輸入停車時數：\n停車費： 210 元\n"},
		{"1", "請輸入停車時數：\n停車費： 30 元\n"},
		{"2", "請輸入停車時數：\n停車費： 60 元\n"},
		{"3", "請輸入停車時數：\n停車費： 110 元\n"},
		{"0", "請輸入停車時數：\n時數要大於 0\n"},
		{"-3", "請輸入停車時數：\n時數要大於 0\n"},
		{"abc", "請輸入停車時數：\n請輸入整數\n"},
	}
	for _, c := range cases {
		if got := runMain(t, c.input+"\n"); got != c.want {
			t.Errorf("輸入 %q 時\n印出：%q\n應該是：%q", c.input, got, c.want)
		}
	}
}
