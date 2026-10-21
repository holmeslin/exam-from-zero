package main

import (
	"testing"
	"time"
)

func TestToTaipei(t *testing.T) {
	for in, want := range map[string]string{
		"2026-03-14 15:00:00": "2026/03/14 23:00",
		"2026-12-31 20:30:59": "2027/01/01 04:30",
		"2026-01-05 00:07:00": "2026/01/05 08:07",
	} {
		got, err := ToTaipei(in)
		if err != nil || got != want {
			t.Errorf("ToTaipei(%q) = (%q, %v), want (%q, nil)", in, got, err, want)
		}
	}
	for _, bad := range []string{"2026/03/14 15:00:00", "hello", ""} {
		if _, err := ToTaipei(bad); err == nil {
			t.Errorf("ToTaipei(%q) 應該回傳錯誤，got nil", bad)
		}
	}
}

func TestOvertime(t *testing.T) {
	day := func(h, m int) time.Time { return time.Date(2026, 3, 14, h, m, 0, 0, time.UTC) }
	cases := []struct {
		start, end time.Time
		want       time.Duration
	}{
		{day(9, 0), day(17, 45), 45 * time.Minute},
		{day(9, 0), day(17, 0), 0},
		{day(9, 0), day(12, 0), 0},
		{day(8, 30), day(20, 0), 3*time.Hour + 30*time.Minute},
	}
	for _, c := range cases {
		if got := Overtime(c.start, c.end); got != c.want {
			t.Errorf("Overtime(%s, %s) = %v, want %v", c.start.Format("15:04"), c.end.Format("15:04"), got, c.want)
		}
	}
}
