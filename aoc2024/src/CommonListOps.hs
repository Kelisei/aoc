module CommonListOps(countOccurrences, convertToNumbers) where

countOccurrences :: Eq a => a -> [a] -> Integer
countOccurrences x xs = toInteger (length (filter (== x) xs))