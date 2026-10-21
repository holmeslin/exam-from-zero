package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	count, total, lineNo := 0, 0, 0
	for scanner.Scan() {
		lineNo++
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			fmt.Fprintf(os.Stderr, "第 %d 行不是整數，略過：%q\n", lineNo, line)
			continue
		}
		count++
		total += n
	}
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "讀取失敗：", err)
		os.Exit(1)
	}
	fmt.Printf("%d 個數字，總和 %d\n", count, total)
}
