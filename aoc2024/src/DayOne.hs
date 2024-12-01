module DayOne (dayOneFirst) where

import System.IO (readFile)
import Data.List (sort)
import Control.Exception (evaluate)

dayOneFirst :: IO Integer
dayOneFirst = do
  contents <- readFile "inputs/input1.txt"
  evaluate (length contents)
  let linesList = lines contents
      (listOne, listTwo) = unzip $ map (\s -> let [x, y] = words s in (read x, read y)) linesList
      sortedListOne = sort listOne
      sortedListTwo = sort listTwo
      res = sum $ zipWith (\x y -> abs (x - y)) sortedListOne sortedListTwo
  return res
