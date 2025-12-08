import { getInputWhole } from './utils.js';

const first = () => {
    const regex = /mul\((\d+)+,(\d+)+\)/g;
    const res = [...getInputWhole("inputs", "input3.txt").matchAll(regex)]
    .map(
        (elem) => [...elem[0].matchAll(/(\d+)+/g)]
        .map(match => Number(match[0]))
    ).reduce((acc, current) => acc + current[0] * current[1], 0);
    return res;
}


const second = () => {
    const regex = /(do\(\)|don't\(\)|mul\((\d+),(\d+)+\))/g;
    const mulReg = /mul\((\d+),(\d+)\)/;
    let enabled = true;
    let res = 0;

    getInputWhole("inputs", "input3.txt").match(regex).forEach((instr) => {
        if (instr === "do()") {
            enabled = true;
        } else if (instr === "don't()") {
            enabled = false;
        } else if (enabled && instr.startsWith('mul')) {
            const [_, x, y] = instr.match(/mul\((\d+),(\d+)\)/);
            res += parseInt(x) * parseInt(y);
        }
    });

    return res;
};

console.log(second());


export default { first, second };