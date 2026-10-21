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
	// TODO: 嵌入 Walker
}

type Dog struct {
	Name string
}

func (d Dog) Speak() string {
	return d.Name + "：汪汪"
}

// TODO: 幫 Dog 加上 Walk() 方法，回傳 Name + " 跑來跑去"

// Play 回傳「叫聲 / 走路」，例如 "Lucky：汪汪 / Lucky 跑來跑去"。
func Play(p Pet) string {
	return p.Speak()
}

func main() {}
