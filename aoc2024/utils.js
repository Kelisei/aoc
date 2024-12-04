import fs from 'fs';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Reads a file and returns its content as an array of lines.
 * @param  {...string} args - The path segments to the file.
 * @returns {string[]} An array of lines from the file.
 */
export function getInputAsLines(...args) {
    return fs.readFileSync(path.join(__dirname, ...args), 'utf8').split("\n");
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
    return fs.readFileSync(path.join(__dirname, ...args), 'utf-8');
}


export const directions = [
    [0, 1],    // up
    [0, -1],   // down
    [-1, 0],   // left
    [1, 0],    // right
    [-1, -1],  // up-left
    [1, 1],    // down-right
    [-1, 1],   // up-right
    [1, -1]    // down-left
];

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
    return 0 <= x + xOffset && x + xOffset < grid.length &&
        0 <= y + yOffset && y + yOffset < grid[0].length;
}

export default { getInputAsLines, getInputRaw, getInputWhole, directions, isInBounds }
