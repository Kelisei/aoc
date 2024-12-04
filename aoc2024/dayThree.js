import fs from 'fs'
const first = () => {
    const regex = /mul\([0-9]+,[0-9]+\)/g;
    const res = [...fs.readFileSync('inputs/input3.txt', 'utf-8').matchAll(regex)]
    .map(
        (elem) => [...elem[0].matchAll(/[0-9]+/g)]
        .map(match => Number(match[0]))
    ).reduce((acc, current) => acc + current[0] * current[1], 0);
    return res;
}


const second = () => {
    const regex = /(do\(\)|don't\(\)|mul\([0-9]+,[0-9]+\))/g;
    let isEnabled = true;
    let result = 0;

    readFileSync('inputs/input3.txt', 'utf-8').match(regex).forEach((instr) => {
        if (instr === "do()") {
            isEnabled = true;
        } else if (instr === "don't()") {
            isEnabled = false;
        } else if (isEnabled && instr.startsWith('mul')) {
            const [_, x, y] = instr.match(/mul\((\d+),(\d+)\)/);
            result += parseInt(x) * parseInt(y);
        }
    });

    return result;
};

console.log(second());


export default { first, second };