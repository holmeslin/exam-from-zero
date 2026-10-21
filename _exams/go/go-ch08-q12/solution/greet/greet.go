package greet

// Hello 回傳打招呼的句子。
func Hello(name string) string {
	return "你好，" + name + "！"
}

// Bye 回傳道別的句子。
func Bye(name string) string {
	return "再見，" + name + "！"
}
