package main

import (
	"errors"
	"strconv"
	"strings"
	"testing"
)

func TestParseScoreOK(t *testing.T) {
	for _, s := range []string{"0", "87", "100"} {
		want, _ := strconv.Atoi(s)
		got, err := ParseScore(s)
		if got != want || err != nil {
			t.Errorf("ParseScore(%q) = %d, %v, want %d, <nil>", s, got, err, want)
		}
	}
}

func TestParseScoreNotNumber(t *testing.T) {
	got, err := ParseScore("九十")
	if err == nil {
		t.Fatalf("ParseScore(\"九十\") 沒有回傳錯誤")
	}
	if got != 0 {
		t.Errorf("出錯時第一個回傳值 = %d, want 0", got)
	}
	if !strings.HasPrefix(err.Error(), "讀取分數失敗：") {
		t.Errorf("錯誤訊息 = %q，應該以「讀取分數失敗：」開頭", err.Error())
	}
	var numErr *strconv.NumError
	if !errors.As(err, &numErr) {
		t.Errorf("錯誤裡沒有包著 strconv.Atoi 的原始錯誤，記得用 %%w 而不是 %%v")
	}
}

func TestParseScoreOutOfRange(t *testing.T) {
	for s, want := range map[string]string{"120": "分數 120 超出範圍", "-5": "分數 -5 超出範圍"} {
		got, err := ParseScore(s)
		if err == nil {
			t.Errorf("ParseScore(%q) 沒有回傳錯誤", s)
			continue
		}
		if got != 0 || err.Error() != want {
			t.Errorf("ParseScore(%q) = %d, %q, want 0, %q", s, got, err.Error(), want)
		}
	}
}
