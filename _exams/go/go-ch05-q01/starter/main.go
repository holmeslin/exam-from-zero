package main

// TooHotError 代表溫度太高的錯誤
type TooHotError struct {
	Temp int
}

// TODO：回傳「溫度 <Temp> 度太熱了」
func (e TooHotError) Error() string {
	return ""
}

func main() {}
