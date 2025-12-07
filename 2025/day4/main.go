package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

func main() {
	pwd, _ := os.Getwd()
	path := filepath.Join(pwd, "input.txt")
	file, _ := os.ReadFile(path)
	var matrix [][]byte
	for line := range strings.Lines(string(file)) {
		line = strings.TrimRight(line, "\r\n")
		matrix = append(matrix, []byte(line))
	}
	var mtx sync.Mutex
	var wait sync.WaitGroup
	height := len(matrix)
	width := len(matrix[0])
	counter := 0
	for i := range height {
		for j := range width {
			wait.Add(1)
			go func(i int, j int, height int, width int, matrix *[][]byte, counter *int, mtx *sync.Mutex, wait *sync.WaitGroup) {
				defer wait.Done()
				if (*matrix)[i][j] == '@' {
					atsFound := 0
					for x := max(0, j-1); x <= min(j+1, width-1); x++ {
						for y := max(0, i-1); y <= min(i+1, height-1); y++ {
							if x == j && y == i {
								continue
							}
							if (*matrix)[y][x] == '@' {
								atsFound++
							}
						}
					}
					if atsFound < 4 {
						(*mtx).Lock()
						(*counter)++
						(*mtx).Unlock()
					}
				}
			}(i, j, height, width, &matrix, &counter, &mtx, &wait)
		}
	}
	wait.Wait()
	fmt.Println(counter)

	stack := make([][2]int, 0, 20)
	counter = 0
	hasChanged := true
	for hasChanged {
		hasChanged = false
		for i := range height {
			for j := range width {
				wait.Add(1)
				go func(i int, j int, height int, width int, matrix *[][]byte, counter *int, mtx *sync.Mutex, wait *sync.WaitGroup, stack *[][2]int, hasChanged *bool) {
					defer wait.Done()
					if (*matrix)[i][j] == '@' {
						atsFound := 0
						for x := max(0, j-1); x <= min(j+1, width-1); x++ {
							for y := max(0, i-1); y <= min(i+1, height-1); y++ {
								if x == j && y == i {
									continue
								}
								if (*matrix)[y][x] == '@' {
									atsFound++
								}
							}
						}
						if atsFound < 4 {
							(*mtx).Lock()
							*hasChanged = true
							*stack = append(*stack, [2]int{i, j})
							(*counter)++
							(*mtx).Unlock()
						}
					}
				}(i, j, height, width, &matrix, &counter, &mtx, &wait, &stack, &hasChanged)
			}
		}
		wait.Wait()
		for len(stack) != 0 {
			n := len(stack) - 1
			val := stack[n]
			stack = stack[:n]
			matrix[val[0]][val[1]] = 'x'
		}
	}
	fmt.Println(counter)
}
