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

        console.log(prev, next);
        if (!safeIncrement(prev, next)) {
            console.log("line " + line + " is not safe");
            return false;
        }

        if (decreasing === null) {
            decreasing = next < prev;
        } else if (decreasing !== (next < prev)) {
            console.log("line " + line + " is not safe");
            return false;
        }
    }
    console.log("line " + line + " is safe");

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
/*
/* TODO
*/
const isSafeV2 = (line) => {
    let decreasing = null;
    for (let i = 0; i < line.length - 1; i++) {
        const prev = line[i];

        const next = line[i + 1];

        console.log(prev, next);
        if (!safeIncrement(prev, next)) {
            console.log("line " + line + " is not safe");
            return false;
        }

        if (decreasing === null) {
            decreasing = next < prev;
        } else if (decreasing !== (next < prev)) {
            console.log("line " + line + " is not safe");
            return false;
        }
    }
    console.log("line " + line + " is safe");

    return true;
};

const second = () => {
    const lines = fs.readFileSync("inputs/input2.txt", "utf-8")
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.split(" ").map(Number))
        .filter(isSafeV2);
    return lines.length;
}

export default { first, second };