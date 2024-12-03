import fs from 'fs';


const safeIncrement = (prev, next) => {
    const diff = Math.abs(prev - next);
    return diff >= 1 && diff <= 3;
};

const isSafeV1 = (line) => {
    let decreasing = null;
    for (let i = 0; i < line.length - 1; i++) {
        const prev = line[i];

        const next = line[i + 1];

        if (!safeIncrement(prev, next)) {
            return false;
        }

        if (decreasing === null) {
            decreasing = next < prev;
        } else if (decreasing !== (next < prev)) {
            return false;
        }
    }
    return true;
};


const first = () => {
    const lines = fs.readFileSync("inputs/input2.txt", "utf-8")
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.split(" ").map(Number))
        .filter(isSafeV1);
    return lines.length;
}

const safeWithOne = (line) => {
    if (isSafeV1(line)){
        return true;
    }
    for (const [index, element] of line.entries()){
        if(isSafeV1(line.slice(0, index).concat(line.slice(index + 1)))){
            return true;
        }
    }
    return false;
};

const second = () => {
    const lines = fs.readFileSync("inputs/input2.txt", "utf-8")
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.split(" ").map(Number))
        .filter(safeWithOne);
    return lines.length;
}

export default { first, second };