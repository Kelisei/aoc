module Main (main) where

import DayOne(dayOneFirst, dayOneSecond)
main :: IO ()
main = do 
    DayOne.dayOneFirst >>= putStrLn . show
    DayOne.dayOneSecond >>= putStrLn . show
