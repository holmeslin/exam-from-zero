package main

// SumInts 只把 items 裡動態型別是 int 的值加起來，其他型別略過。
func SumInts(items []any) int {
	total := 0
	for _, item := range items {
		if n, ok := item.(int); ok {
			total += n
		}
	}
	return total
}

func main() {}
