package greet

// Hello 回傳對 name 打招呼的句子；name 是空字串時改用「朋友」。
func Hello(name string) string {
	if name == "" {
		name = "朋友"
	}
	return "你好，" + name + "！"
}
