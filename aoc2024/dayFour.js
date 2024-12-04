import { getInputAsLines, findWordOccurrencesInGrid } from './utils.js';

function first() {
    const lines = getInputAsLines("inputs", "input4.txt");
    let count = 0;
    for (let i = 0; i < Math.pow(lines.length, 2); i++) {
        // I've abstracted the behaviour away in this function for future use.
        count += findWordOccurrencesInGrid("XMAS", lines, Math.trunc(i / lines.length), i % lines.length, "*");
    }
    return count;
}

function second() {
    const validValues = ["MSMS", "MSSM", "SMMS", "SMSM"];
    const lines = getInputAsLines("inputs", "input4.txt");
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