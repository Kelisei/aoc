import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

import { getInputAsLines } from './utils.js';

const first = () => {
    let [listOne, listTwo] = getInputAsLines("inputs", "input1.txt")
        .map(line => line.split(" ").filter(num => num !== "").map(Number))
        .reduce(([one, two], [num1, num2]) => {
            !isNaN(num1) ? one.push(num1) : null;
            !isNaN(num2) ? two.push(num2) : null;
            return [one, two];
        }, [[], []]);

    listOne = listOne.sort((a, b) => a - b).filter((n) => !isNaN(n));
    listTwo = listTwo.sort((a, b) => a - b).filter((n) => !isNaN(n));


    const acc = listOne.reduce((acc, numOne, index) => acc + Math.abs(numOne - listTwo[index]), 0);
    return acc;
}

const second = () => {
    let [listOne, listTwo] = getInputAsLines("inputs", "input1.txt")
        .map(line => line.split(" ").filter(num => num !== "").map(Number))
        .reduce(([one, two], [num1, num2]) => {
            !isNaN(num1) ? one.push(num1) : null;
            !isNaN(num2) ? two.push(num2) : null;
            return [one, two];
        }, [[], []]);

    listOne = listOne.filter((n) => !isNaN(n));
    listTwo = listTwo.filter((n) => !isNaN(n));


    const acc = listOne.reduce((acc, numOne, index) => acc += (numOne * listTwo.filter((numTwo) => numTwo === numOne).length), 0);
    return acc;
}

export default { first, second };
