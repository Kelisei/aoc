import fs from 'fs';


const directions = [
    [0, 1],    // up
    [0, -1],   // down
    [-1, 0],   // left
    [1, 0],    // right
    [-1, -1],  // up-left
    [1, 1],    // down-right
    [-1, 1],   // up-right
    [1, -1]    // down-left
];

function isInBounds(i, j, xOffset, yOffset, lines) {
    return 0 <= i + xOffset && i + xOffset < lines.length &&
        0 <= j + yOffset && j + yOffset < lines[0].length;
}

function first() {
    const lines = fs.readFileSync("inputs/input4.txt", "utf-8").split("\n");
    let count = 0;
    for (let [i, line] of lines.entries()) {
        for (let [j, char] of line.split("").entries()) {
            if (char === "X") {
                for (let [xOffset, yOffset] of directions) {
                    if (isInBounds(i, j, 3 * xOffset, 3 * yOffset, lines)) {
                        if (lines[i + xOffset][j + yOffset] == "M" && lines[i + 2 * xOffset][j + 2 * yOffset] == "A" && lines[i + 3 * xOffset][j + 3 * yOffset] == "S") {
                            count++;
                        }
                    }
                }
            }
        }
    }
    return count;
}

function second() {
    const validValues = ["MSMS", "MSSM", "SMMS", "SMSM"];
    const lines = fs.readFileSync("inputs/input4.txt", "utf-8").split("\n");
    let count = 0;
    for (let i = 1; i < lines.length - 1; i++) {
        const line = lines[i];
        for (let j = 1; j < line.length - 1; j++) {
            const char = line[j];
            if (char === "A") {
                if (validValues.includes(lines[i + 1][j + 1] + lines[i - 1][j - 1] + lines[i + 1][j - 1] + lines[i - 1][j + 1])) {
                    count++;
                }
            }
        }
    }
    return count;
}

export default { first, second };