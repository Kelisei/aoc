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
	file, err := os.ReadFile(path)
	fmt.Println(err)
	lines := strings.Lines(string(file))
	dial := 50
	counter := 0
	for line := range lines {
		fmt.Println(line)
		if strings.HasPrefix(line, "L") {
			strAmount := strings.TrimSpace(strings.Replace(line, "L", "", 1))
			amount, _ := strconv.Atoi(strAmount)
			dial = (dial - amount)
		} else if strings.HasPrefix(line, "R") {
			strAmount := strings.TrimSpace(strings.Replace(line, "R", "", 1))
			amount, _ := strconv.Atoi(strAmount)
			dial = (dial + amount)
		}
		fmt.Println(dial)
		dial = dial % 100
		if dial == 0 {
			fmt.Println("true")
			counter++
		}
	}
	fmt.Println("Password:", counter)

	lines = strings.Lines(string(file))
	dial = 50
	counter = 0
	for line := range lines {
		if strings.HasPrefix(line, "L") {
			strAmount := strings.TrimSpace(strings.Replace(line, "L", "", 1))
			amount, _ := strconv.Atoi(strAmount)

			for range amount {
				dial = (dial - 1) % 100
				if dial == 0 {
					counter++
				}

			}
		} else if strings.HasPrefix(line, "R") {
			strAmount := strings.TrimSpace(strings.Replace(line, "R", "", 1))
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
