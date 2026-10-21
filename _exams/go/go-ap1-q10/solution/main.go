package main

func Perks(level int) []string {
	var perks []string
	switch level {
	case 3:
		perks = append(perks, "皇冠")
		fallthrough
	case 2:
		perks = append(perks, "寶石")
		fallthrough
	case 1:
		perks = append(perks, "金幣")
	}
	return perks
}

func main() {}
