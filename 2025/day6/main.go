package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func main() {
	pwd, _ := os.Getwd()
	f, _ := os.Open(filepath.Join(pwd, "input.txt"))
	defer f.Close()

	scanner := bufio.NewScanner(f)
	matrix := make([][]int, 0)
	ops := make([]bool, 0)

	for scanner.Scan() {
		currentLine := scanner.Text()
		if currentLine[0] == '+' || currentLine[0] == '*' {
			operations := strings.Fields(currentLine)
			for i := range operations {
				if operations[i] == "+" {
					ops = append(ops, true)
				} else {
					ops = append(ops, false)
				}
			}
			break
		}
		nums := strings.Fields(currentLine)
		numbersInLine := make([]int, 0)
		for i := range nums {
			num, _ := strconv.Atoi(nums[i])
			numbersInLine = append(numbersInLine, num)
		}
		matrix = append(matrix, numbersInLine)
	}

	counter := 0
	for i := range ops {
		sum := 0
		for j := range matrix {
			if sum == 0 {
				sum = matrix[j][i]
			} else if ops[i] {
				sum += matrix[j][i]
			} else {
				sum *= matrix[j][i]
			}
		}
		counter += sum
	}
	fmt.Println(counter)

	f.Seek(0, 0)
	scanner = bufio.NewScanner(f)

	stringList := make([]string, 0)
	ops = make([]bool, 0)

	for scanner.Scan() {
		currentLine := scanner.Text()
		if currentLine[0] == '+' || currentLine[0] == '*' {
			operations := strings.Fields(currentLine)
			for i := range operations {
				if operations[i] == "+" {
					ops = append(ops, true)
				} else {
					ops = append(ops, false)
				}
			}
			break
		}
		stringList = append(stringList, currentLine)
	}

	height := len(stringList)
	width := len(stringList[0])

	problems := make([][]int, 0)
	currentProblem := make([]int, 0)

	for col := range width {
		isBlank := true
		for row := 0; row < height; row++ {
			if stringList[row][col] != ' ' {
				isBlank = false
				break
			}
		}

		if isBlank {
			if len(currentProblem) > 0 {
				problems = append(problems, currentProblem)
				currentProblem = make([]int, 0)
			}
			continue
		}

		var sb strings.Builder
		for row := 0; row < height; row++ {
			ch := stringList[row][col]
			if ch >= '0' && ch <= '9' {
				sb.WriteByte(ch)
			}
		}
		if sb.Len() == 0 {
			continue
		}
		n, _ := strconv.Atoi(sb.String())
		currentProblem = append(currentProblem, n)
	}

	if len(currentProblem) > 0 {
		problems = append(problems, currentProblem)
	}

	counter = 0
	for i, nums := range problems {
		sum := 0
		for _, v := range nums {
			if sum == 0 {
				sum = v
			} else if ops[i] {
				sum += v
			} else {
				sum *= v
			}
		}
		counter += sum
	}

	fmt.Println(counter)
}
