defmodule P1 do
  def find_calibration_value_p1(file_path) do
    sum =
      File.read!(file_path)
      |> String.split("\n", trim: true)
      |> Enum.map(fn line ->
        line
        |> String.graphemes()
        |> Enum.filter(fn char -> String.match?(char, ~r/^\d$/) end)
      end)
      |> Enum.map(fn digits ->
        String.to_integer("#{List.first(digits)}#{List.last(digits)}")
      end)
      |> Enum.reduce(&(&1 + &2))

    sum
  end

  def find_calibration_value_p2(file_path) do
    sum =
      File.read!(file_path)
      |> String.split("\n", trim: true)
      |> Enum.map(fn line ->
        line
        |> String.replace("one", "o1e")
        |> String.replace("two", "t2o")
        |> String.replace("three", "t3e")
        |> String.replace("four", "f4r")
        |> String.replace("five", "f5e")
        |> String.replace("six", "s6x")
        |> String.replace("seven", "s7n")
        |> String.replace("eight", "e8t")
        |> String.replace("nine", "n9e")
      end)
      |> Enum.map(fn line ->
        line
        |> String.graphemes()
        |> Enum.filter(fn char -> String.match?(char, ~r/^\d$/) end)
      end)
      |> Enum.map(fn digits ->
        String.to_integer("#{List.first(digits)}#{List.last(digits)}")
      end)
      |> Enum.reduce(&(&1 + &2))

    sum
  end
end

IO.puts(P1.find_calibration_value_p1("inputs/p1.txt"))
IO.puts(P1.find_calibration_value_p2("inputs/p1.txt"))
