package main

import (
	"strings"
	"testing"
)

func TestPerks(t *testing.T) {
	cases := map[int]string{
		3: "皇冠,寶石,金幣",
		2: "寶石,金幣",
		1: "金幣",
		0: "",
		4: "",
	}
	for level, want := range cases {
		if got := strings.Join(Perks(level), ","); got != want {
			t.Errorf("Perks(%d) = [%s], want [%s]", level, got, want)
		}
	}
}
