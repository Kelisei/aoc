package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

func main() {
	pwd, _ := os.Getwd()
	f, _ := os.Open(filepath.Join(pwd, "input.txt"))
	scanner := bufio.NewScanner(f)
	defer f.Close()

	firstPartDone := false
	type Interval struct {
		start int
		end   int
	}
	ranges := make([]Interval, 0)
	counter := 0
	for scanner.Scan() {
		line := scanner.Text()
		if !firstPartDone {
			if line == "" {
				firstPartDone = true
				fmt.Println("space")
			} else {
				nums := strings.Split(line, "-")
				start, _ := strconv.Atoi(strings.TrimSpace(nums[0]))
				end, _ := strconv.Atoi(strings.TrimSpace(nums[1]))
				endstart := Interval{start: start, end: end}
				ranges = append(ranges, endstart)
			}
		} else {
			num, _ := strconv.Atoi(strings.TrimSpace(line))
			for i := range ranges {
				if num >= ranges[i].start && num <= ranges[i].end {
					//fmt.Printf("%d is in range of [%d %d] \n", num, ranges[i].start, ranges[i].end)
					counter++
					break
				}
			}
		}
	}
	fmt.Println(counter)
	f.Seek(0, 0)
	scanner = bufio.NewScanner(f)
	ranges = make([]Interval, 0)
	counter = 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		} else {
			nums := strings.Split(line, "-")
			start, _ := strconv.Atoi(strings.TrimSpace(nums[0]))
			end, _ := strconv.Atoi(strings.TrimSpace(nums[1]))
			endstart := Interval{start: start, end: end}
			ranges = append(ranges, endstart)
		}
	}

	sort.Slice(ranges, func(i, j int) bool {
		return ranges[i].start < ranges[j].start
	})
	result := make([]Interval, 0)
	current := ranges[0]

	for i := 1; i < len(ranges); i++ {
		next := ranges[i]

		if next.start <= current.end {
			current.end = max(next.end, current.end)
		} else {
			result = append(result, current)
			current = next
		}
	}
	result = append(result, current)
	for i := range result {
		// fmt.Printf("range [%d, %d], longitud de %d \n", result[i].start, result[i].end, result[i].end-result[i].start+1)
		counter += result[i].end - result[i].start + 1
	}
	fmt.Println(counter)
}
