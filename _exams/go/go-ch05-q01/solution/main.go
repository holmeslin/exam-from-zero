package main

import "fmt"

// TooHotError 代表溫度太高的錯誤
type TooHotError struct {
	Temp int
}

func (e TooHotError) Error() string {
	return fmt.Sprintf("溫度 %d 度太熱了", e.Temp)
}

func main() {}
