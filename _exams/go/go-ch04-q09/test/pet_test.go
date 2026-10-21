package main

import "testing"

type zzOnlySpeaks struct{}

func (zzOnlySpeaks) Speak() string { return "..." }

func TestPetNeedsWalk(t *testing.T) {
	var x any = zzOnlySpeaks{}
	if _, ok := x.(Pet); ok {
		t.Errorf("只有 Speak() 的型別不應該算是 Pet：Pet 要嵌入 Walker")
	}
}

func TestDogIsWalker(t *testing.T) {
	var x any = Dog{Name: "Lucky"}
	w, ok := x.(Walker)
	if !ok {
		t.Fatalf("Dog 沒有實作 Walker：還缺 Walk() string 方法")
	}
	if got, want := w.Walk(), "Lucky 跑來跑去"; got != want {
		t.Errorf("Dog{Name: \"Lucky\"}.Walk() = %q, want %q", got, want)
	}
}

func TestPlay(t *testing.T) {
	for _, name := range []string{"Lucky", "小白"} {
		want := name + "：汪汪 / " + name + " 跑來跑去"
		if got := Play(Dog{Name: name}); got != want {
			t.Errorf("Play(Dog{Name: %q}) = %q, want %q", name, got, want)
		}
	}
}
