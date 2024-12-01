module Main (main) where

import CommonStringOps (replace)
import Data.Char (isDigit)
import Data.List (foldl')

-- Función para reemplazar las palabras numéricas por su versión con dígitos
replaceWordsWithDigits :: String -> String
replaceWordsWithDigits line =
  foldl'
    (\acc (word, replacement) -> replace word replacement acc)
    line
    [ ("zero", "z0ro"),
      ("one", "o1e"),
      ("two", "t2o"),
      ("three", "t3ree"),
      ("four", "fo4r"),
      ("five", "fi5ve"),
      ("six", "si6x"),
      ("seven", "se7en"),
      ("eight", "ei8ht"),
      ("nine", "ni9e")
    ]

-- This function takes in a line of text, filters out non-numeric chars and then checks for the cases:
-- If there is no numbers in the line, it returns nothing
-- If there only one digit, it returns a Int with the digit duplicated, e.g 7 -> 77
-- Else it returns the head andlast digits combined into an Int
-- Note: Just & Maybe represents a value, similar to how Optional in Java wraps a value. Just is for when it has a value.
getDigitsInLine :: String -> Maybe Int
getDigitsInLine line =
  let digits = filter isDigit line
   in do
        case digits of
          [] -> Nothing
          [x] -> Just (read [x, x])
          _ -> Just (read [head digits, last digits])

getDigitsInLineV2 :: String -> Maybe Int
getDigitsInLineV2 line = getDigitsInLine (replaceWordsWithDigits line)

-- Reads file and applies the function getDigitsInLine for every line, then it adds the numbers together
first :: String -> IO Int
first fileName = do
  content <- readFile fileName
  let lineas = lines content
  let numeros = map getDigitsInLineV2 lineas
  return $ sum $ map (\(Just x) -> x) (filter (/= Nothing) numeros)

check :: String -> IO [String]
check fileName = do
  content <- readFile fileName
  let lineas = lines content
  let numeros = map replaceWordsWithDigits lineas
  return numeros

-- filter (/= Nothing) removes lines where getDigitsInLine returns Nothing (i.e., lines without numbers)
-- map (\(Just x) -> x) extracts the values from the Just constructor
-- sum just adds things up

main :: IO ()
main = do
  let fileName = "input.txt"

  suma <- first fileName

  putStrLn $ "La suma total es: " ++ show suma

-- result <- check fileName  -- Bind the IO [String] to a value
-- putStrLn $ unlines result  -- Use unlines to join the list of strings into a single string
