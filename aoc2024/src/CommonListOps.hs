module CommonListOps(countOccurrences) where

countOccurrences :: Eq a => a -> [a] -> Integer
countOccurrences x xs = toInteger (length (filter (== x) xs))