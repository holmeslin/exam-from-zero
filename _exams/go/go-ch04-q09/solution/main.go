package main

type Speaker interface {
	Speak() string
}

type Walker interface {
	Walk() string
}

// Pet 要同時能 Speak 和 Walk。
type Pet interface {
	Speaker
	Walker
}

type Dog struct {
	Name string
}

func (d Dog) Speak() string {
	return d.Name + "：汪汪"
}

func (d Dog) Walk() string {
	return d.Name + " 跑來跑去"
}

// Play 回傳「叫聲 / 走路」，例如 "Lucky：汪汪 / Lucky 跑來跑去"。
func Play(p Pet) string {
	return p.Speak() + " / " + p.Walk()
}

func main() {}
