package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Split(bufio.ScanWords)
	w := bufio.NewWriter(os.Stdout)
	defer w.Flush()

	count := 0
	for scanner.Scan() {
		count++
		fmt.Fprintf(w, "%d: %s\n", count, scanner.Text())
	}
	fmt.Fprintf(w, "共 %d 個單字\n", count)
}
