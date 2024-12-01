module Main (main) where

import DayOne
main :: IO ()
main = do 
    DayOne.dayOneFirst >>= putStrLn . show
