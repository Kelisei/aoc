import fs from "fs";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Reads a file and returns its content as an array of lines.
 * @param  {...string} args - The path segments to the file.
 * @returns {string[]} An array of lines from the file.
 */
export function getInputAsLines(...args) {
  return fs.readFileSync(path.join(__dirname, ...args), "utf8").split("\n");
}

/**
 * Reads a file and returns its raw content.
 * @param  {...string} args - The path segments to the file.
 * @returns {Buffer} The raw content of the file.
 */
export function getInputRaw(...args) {
  return fs.readFileSync(path.join(__dirname, ...args));
}

/**
 * Reads a file and returns its entire content as a UTF-8 string.
 * @param  {...string} args - The path segments to the file.
 * @returns {string} The entire content of the file.
 */
export function getInputWhole(...args) {
  return fs.readFileSync(path.join(__dirname, ...args), "utf-8");
}

export const directions = {
  "*": [
    [0, 1], // up
    [0, -1], // down
    [-1, 0], // left
    [1, 0], // right
    [-1, -1], // up-left
    [1, 1], // down-right
    [-1, 1], // up-right
    [1, -1], // down-left
  ],
  "+": [
    [0, 1], // up
    [0, -1], // down
    [-1, 0], // left
    [1, 0], // right
  ],
  x: [
    [-1, -1], // up-left
    [1, 1], // down-right
    [-1, 1], // up-right
    [1, -1], // down-left
  ],
};

/**
 * Searches for occurrences of a word in a grid, starting at a specific position (x, y)
 * and following a specified search pattern.
 *
 * @param {string} word - The word to search for in the grid.
 * @param {Array<Array<string>>} grid - A 2D array representing the grid where the search will occur.
 * @param {number} x - The x-coordinate (row index) of the starting position.
 * @param {number} y - The y-coordinate (column index) of the starting position.
 * @param {string} [pattern="*"] - The search pattern to use. Valid options are:
 *     - "*" (all directions),
 *     - "+" (horizontal and vertical),
 *     - "x" (diagonal directions).
 * @returns {number} The number of occurrences of the word found in the specified pattern.
 *
 * @throws {Error} If the provided pattern is invalid.
 *
 * @example
 * const grid = [
 *     ['a', 'b', 'c'],
 *     ['d', 'a', 'b'],
 *     ['a', 'b', 'a']
 * ];
 * const count = findWordOccurrencesInGrid('ab', grid, 0, 0, '+');
 * console.log(count); // Output: 1
 */
export function findWordOccurrencesInGrid(word, grid, x, y, pattern = "*") {
  let searchPattern;
  try {
    searchPattern = directions[pattern];
  } catch (e) {
    console.log("The patterns for the search are *, +, x");
    throw e;
  }
  const safeCheckRange = word.length - 1;
  let count = 0;
  for (let [xOffset, yOffset] of searchPattern) {
    if (
      isInBounds(x, y, safeCheckRange * xOffset, safeCheckRange * yOffset, grid)
    ) {
      let found = true;
      for (const [i, char] of word.split("").entries()) {
        if (grid[x + xOffset * i][y + yOffset * i] !== char) {
          found = false;
          break;
        }
      }
      if (found) {
        count++;
      }
    }
  }
  return count;
}

export function extractNumbersFromString(str) {
  return str.match(/\d+/g).map(Number);
}

export function logInBox(title, ...texts) {
  const { columns } = process.stdout;
  if (columns === 0) {
    columns = title.length;
  }
  let line = "┏";
  const padding = Math.floor((columns - title.length - 4) / 2);
  const extra = (columns - title.length - 4) % 2;
  line +=
    "━".repeat(padding) + " " + title + " " + "━".repeat(padding + extra) + "┓";
  console.log(line);

  for (let text of texts) {
    text = String(text);
    line = "┃";
    const textPadding = Math.floor((columns - text.length - 2) / 2);
    const textExtra = (columns - text.length - 2) % 2;
    line +=
      " ".repeat(textPadding) +
      text +
      " ".repeat(textPadding + textExtra) +
      "┃";
    console.log(line);
  }

  line = "┗" + "━".repeat(columns - 2) + "┛";
  console.log(line);
}

/**
 * Checks if the given position (i + xOffset, j + yOffset) is within the bounds
 * of a 2D grid represented by `lines`.
 *
 * @param {number} x - The current row index.
 * @param {number} y - The current column index.
 * @param {number} xOffset - The horizontal offset to apply to the row index.
 * @param {number} yOffset - The vertical offset to apply to the column index.
 * @param {Array<Array<any>>} grid - The 2D array representing the grid.
 * @returns {boolean} - Returns `true` if the new position is within the grid's bounds, `false` otherwise.
 */
export function isInBounds(x, y, xOffset, yOffset, grid) {
  return (
    0 <= x + xOffset &&
    x + xOffset < grid.length &&
    0 <= y + yOffset &&
    y + yOffset < grid[0].length
  );
}
export function isNotEmptyString(value) {
  return value !== '';
}

/**
 * Generates all possible combinations of the specified length from the provided elements.
 * This function uses a generator to yield each combination as an array.
 * 
 * @generator
 * @param {number} strLen - The length of each combination to generate.
 * @param {...any} elems - The elements to include in the combinations.
 * @yields {Array<any>} - An array representing one combination of the elements.
 *
 * @example
 * const combinations = generateCombinations(2, 'a', 'b');
 * for (const combo of combinations) {
 *   console.log(combo);
 * }
 * // Output:
 * // ['a', 'a']
 * // ['b', 'a']
 * // ['a', 'b']
 * // ['b', 'b']
 */
export function* generateCombinations(strLen, ...elems) {
  for (let i = 0; i < Math.pow(elems.length, strLen); i++) {
    let currentCombination = [];
    let temp = i;
    for (let j = 0; j < strLen; j++) {
      currentCombination.push(elems[temp % elems.length]);
      temp = Math.floor(temp / elems.length);
    }
    yield currentCombination;
  }
}

/**
 * Generates all possible binary combinations of the specified length using two operators.
 * This function uses a generator to yield each combination as an array.
 * 
 * @generator
 * @param {number} strLen - The length of each binary combination to generate.
 * @param {any} op1 - The first operator to use in the combinations (default value when a bit is unset).
 * @param {any} op2 - The second operator to use in the combinations (value when a bit is set).
 * @yields {Array<any>} - An array representing one binary combination of the operators.
 *
 * @example
 * const binaryCombinations = generateBinaryCombinations(3, 0, 1);
 * for (const combo of binaryCombinations) {
 *   console.log(combo);
 * }
 * // Output:
 * // [0, 0, 0]
 * // [1, 0, 0]
 * // [0, 1, 0]
 * // [1, 1, 0]
 * // [0, 0, 1]
 * // [1, 0, 1]
 * // [0, 1, 1]
 * // [1, 1, 1]
 */
export function* generateBinaryCombinations(strLen, op1, op2) {
  for (let i = 0; i < Math.pow(2, strLen); i++) {
    yield Array(strLen).fill(op1).map((_, index) =>
      (i & (1 << index)) ? op2 : op1
    );
  }
}

export default {
  getInputAsLines,
  getInputRaw,
  getInputWhole,
  directions,
  isInBounds,
  findWordOccurrencesInGrid,
  isEmptyString: isNotEmptyString,
  extractNumbersFromString,
  generateCombinations
};
