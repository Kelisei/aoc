package main

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
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
	workers := runtime.NumCPU()
	rowsPerWorker := height / workers

	counter := 0

	for w := range workers {
		start := w * rowsPerWorker
		end := start + rowsPerWorker

		if w == workers-1 {
			end = height
		}

		wait.Add(1)
		go func(start, end int) {
			defer wait.Done()

			localCount := 0

			for i := start; i < end; i++ {
				for j := 0; j < width; j++ {
					if matrix[i][j] == '@' {
						atsFound := 0
						for x := max(0, j-1); x <= min(j+1, width-1); x++ {
							for y := max(0, i-1); y <= min(i+1, height-1); y++ {
								if x == j && y == i {
									continue
								}
								if matrix[y][x] == '@' {
									atsFound++
								}
							}
						}
						if atsFound < 4 {
							localCount++
						}
					}
				}
			}
			mtx.Lock()
			counter += localCount
			mtx.Unlock()

		}(start, end)
	}

	wait.Wait()
	fmt.Println(counter)

	counter = 0
	stack := make([][2]int, 0, 20)
	hasChanged := true

	for hasChanged {
		hasChanged = false
		stack = stack[:0]
		workers := min(runtime.NumCPU(), height)
		rowsPerWorker := (height + workers - 1) / workers

		type result struct {
			stack   [][2]int
			count   int
			changed bool
		}

		results := make(chan result, workers)

		for w := range workers {
			start := w * rowsPerWorker
			end := start + rowsPerWorker
			if start >= height {
				break
			}
			if end > height {
				end = height
			}

			go func(start, end int) {
				localStack := make([][2]int, 0, 32)
				localCount := 0
				localChanged := false

				for i := start; i < end; i++ {
					for j := 0; j < width; j++ {
						if matrix[i][j] == '@' {
							atsFound := 0
							for x := max(0, j-1); x <= min(j+1, width-1); x++ {
								for y := max(0, i-1); y <= min(i+1, height-1); y++ {
									if x == j && y == i {
										continue
									}
									if matrix[y][x] == '@' {
										atsFound++
									}
								}
							}
							if atsFound < 4 {
								localChanged = true
								localCount++
								localStack = append(localStack, [2]int{i, j})
							}
						}
					}
				}

				results <- result{
					stack:   localStack,
					count:   localCount,
					changed: localChanged,
				}
			}(start, end)
		}

		for range workers {
			r := <-results
			if r.changed {
				hasChanged = true
			}
			counter += r.count
			stack = append(stack, r.stack...)
		}

		for _, p := range stack {
			i, j := p[0], p[1]
			matrix[i][j] = 'x'
		}
	}

	fmt.Println(counter)
}
