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
	lines := strings.Lines(string(file))
	maxSum := 0
	for line := range lines {
		max := -1
		for i := range len(line) {
			for j := i + 1; j < len(line); j++ {
				concat := strings.TrimSpace(string([]byte{line[i], line[j]}))
				if concat == "" {
					continue
				}
				num, err := strconv.Atoi(concat)
				if err != nil {
					panic(err)
				}
				if num > max {
					max = num
				}
			}
		}
		maxSum += max
	}
	fmt.Println(maxSum)

	file, _ = os.ReadFile(path)
	lines = strings.Lines(string(file))
	maxSum = 0
	for line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		const want = 12
		remove := len(line) - want
		stack := make([]byte, 0, len(line))

		for i := 0; i < len(line); i++ {
			c := line[i]

			for len(stack) > 0 && remove > 0 && stack[len(stack)-1] < c {
				stack = stack[:len(stack)-1]
				remove--
			}
			stack = append(stack, c)
		}

		if len(stack) > want {
			stack = stack[:want]
		}

		res := string(stack)

		max, err := strconv.Atoi(res)
		if err != nil {
			panic(err)
		}
		maxSum += max
	}
	fmt.Println(maxSum)
}
