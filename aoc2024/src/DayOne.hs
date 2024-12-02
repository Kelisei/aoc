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
  return $ sum $ zipWith (\x y -> abs (x - y)) sortedListOne sortedListTwo

dayOneSecond :: IO Integer
dayOneSecond = do
  contents <- readFile "inputs/input1.txt"
  let linesList = lines contents
      (listOne, listTwo) = unzip $ map (\s -> let [x, y] = words s in (read x, read y)) linesList
  return $ sum [x * count2 | x <- listOne, let count2 = countOccurrences x listTwo]