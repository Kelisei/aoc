package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func main() {
	pwd, _ := os.Getwd()
	path := filepath.Join(pwd, "input.txt")
	file, _ := os.ReadFile(path)
	lines := strings.Split(string(file), "\n")
	dial := 50
	counter := 0
	for i := range len(lines) {
		line := lines[i]
		if strings.HasPrefix(line, "L") {
			strAmount := strings.Replace(line, "L", "", 1)
			amount, _ := strconv.Atoi(strAmount)
			dial = (dial - amount)
		} else if strings.HasPrefix(line, "R") {
			strAmount := strings.Replace(line, "R", "", 1)
			amount, _ := strconv.Atoi(strAmount)
			dial = (dial + amount)

		}
		dial = dial % 100
		if dial == 0 {
			counter++
		}
	}
	fmt.Println("Password:", counter)

	dial = 50
	counter = 0
	for i := range len(lines) {
		line := lines[i]
		if strings.HasPrefix(line, "L") {
			strAmount := strings.Replace(line, "L", "", 1)
			amount, _ := strconv.Atoi(strAmount)
			for range amount {
				dial = (dial - 1) % 100
				if dial == 0 {
					counter++
				}

			}
		} else if strings.HasPrefix(line, "R") {
			strAmount := strings.Replace(line, "R", "", 1)
			amount, _ := strconv.Atoi(strAmount)
			for range amount {
				dial = (dial + 1) % 100
				if dial == 0 {
					counter++
				}
			}
		}

	}
	fmt.Println("Password:", counter)
}
