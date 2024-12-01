module CommonStringOps (replace) where 

replace :: String -> String -> String -> String
replace old new = go
  where
    go [] = []
    go str@(x:xs)
      | take (length old) str == old = new ++ go (drop (length old) str)
      | otherwise = x : go xs