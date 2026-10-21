package greet

import "fmt"

// 回傳打招呼的句子。
func Hello(name string) string {
	return "你好，" + name + "！"
}

func Bye(name string) string {
	return fmt.Sprintf("再見，%s！", name)
}
