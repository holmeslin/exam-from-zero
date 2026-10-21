// Package greet 負責產生打招呼和道別的句子。
package greet

import "fmt"

// Hello 回傳對 name 打招呼的句子。
func Hello(name string) string {
	return "你好，" + name + "！"
}

// Bye 回傳對 name 道別的句子。
func Bye(name string) string {
	return fmt.Sprintf("再見，%s！", name)
}
