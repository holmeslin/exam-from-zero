package main

import (
	"strings"
	"testing"
)

func TestReport(t *testing.T) {
	var sb strings.Builder
	Report(&sb, []string{"Andy", "Betty"})
	if got, want := sb.String(), "- Andy\n- Betty\n"; got != want {
		t.Errorf("Report 寫進 Builder 的內容 = %q, want %q", got, want)
	}

	var empty strings.Builder
	Report(&empty, nil)
	if got := empty.String(); got != "" {
		t.Errorf("Report(&sb, nil) 寫進 Builder 的內容 = %q, want 空字串", got)
	}
}
