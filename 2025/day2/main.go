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
	pth := filepath.Join(pwd, "input.txt")
	file, _ := os.ReadFile(pth)
	split := strings.Split(string(file), ",")
	invalidSum := 0
	for i := range len(split) {
		ids := strings.Split(split[i], "-")
		start, err1 := strconv.Atoi(strings.TrimSpace(ids[0]))
		end, err2 := strconv.Atoi(strings.TrimSpace(ids[1]))
		if err1 != nil || err2 != nil {
			fmt.Println(err1.Error(), err2.Error())
			panic(err1)
		}
		for j := start; j <= end; j++ {
			num := strconv.Itoa(j)
			length := len(num)
			if length%2 == 0 && num[length/2:] == num[:length/2] {
				invalidSum += j
			}
		}
	}
	fmt.Println(invalidSum)

}
