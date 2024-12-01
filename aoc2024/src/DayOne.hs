module DayOne (dayOneFirst, dayOneSecond) where

import CommonListOps (countOccurrences)
import Data.List (sort)

dayOneFirst :: IO Integer
dayOneFirst = do
  contents <- readFile "inputs/input1.txt"
  let linesList = lines contents
      (listOne, listTwo) = unzip $ map (\s -> let [x, y] = words s in (read x, read y)) linesList
      sortedListOne = sort listOne
      sortedListTwo = sort listTwo
      res = sum $ zipWith (\x y -> abs (x - y)) sortedListOne sortedListTwo
  return res

calculateSum :: [Integer] -> [Integer] -> Integer
calculateSum list1 list2 = sum [x * count2 | x <- list1, let count2 = countOccurrences x list2]


dayOneSecond :: IO Integer
dayOneSecond = do
  contents <- readFile "inputs/input1.txt"
  let linesList = lines contents
      (listOne, listTwo) = unzip $ map (\s -> let [x, y] = words s in (read x, read y)) linesList
      res = calculateSum listOne listTwo
  return res