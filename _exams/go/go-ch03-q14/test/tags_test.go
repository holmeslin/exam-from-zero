package main

import "testing"

func TestTagsZeroValue(t *testing.T) {
	defer func() {
		if r := recover(); r != nil {
			t.Fatalf("對零值的 Tags 呼叫方法時 panic：%v（零值裡的 map 是 nil，不能直接寫入）", r)
		}
	}()
	var tags Tags
	if tags.Has("go") || tags.Len() != 0 {
		t.Fatalf("var tags Tags 之後 Has(\"go\") = %v，Len() = %d, want false，0", tags.Has("go"), tags.Len())
	}
	tags.Add("go")
	tags.Add("tui")
	tags.Add("go")
	if !tags.Has("go") || !tags.Has("tui") || tags.Has("rust") {
		t.Errorf("加入 go、tui、go 之後 Has(go)=%v Has(tui)=%v Has(rust)=%v, want true true false", tags.Has("go"), tags.Has("tui"), tags.Has("rust"))
	}
	if got := tags.Len(); got != 2 {
		t.Errorf("加入 go、tui、go 之後 Len() = %d, want 2", got)
	}
}
