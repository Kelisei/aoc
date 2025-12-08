import { extractNumbersFromString, getInputAsLines, isNotEmptyString, generateCombinations, generateBinaryCombinations} from "./utils.js";

function evaluateEquation(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        }
    }
    return result;
}

function couldBeEquation(line) {
    const numbers = extractNumbersFromString(line);
    const target = numbers[0];
    const nums = numbers.slice(1);
    const numOperators = nums.length - 1;
    for (const operators of generateBinaryCombinations(numOperators, '+', '*')) {
        try {
            if (evaluateEquation(nums, operators) === target) {
                return true;
            }
        } catch (e) {
            continue;
        }
    }
    return false;
}
function first() {
    return getInputAsLines("inputs", "input7.txt")
        .filter(isNotEmptyString)
        .filter(couldBeEquation)
        .reduce((acc, line) => {
            const numbers = extractNumbersFromString(line);
            return acc + numbers[0];
        }, 0);
}

function concatenate(a, b) {
    return Number(String(a) + String(b));
}

function evaluateEquationV2(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        switch (operators[i]) {
            case '+':
                result += numbers[i + 1];
                break;
            case '*':
                result *= numbers[i + 1];
                break;
            case '||':
                result = concatenate(result, numbers[i + 1]);
                break;
        }
    }
    return result;
}

function couldBeEquationV2(line) {
    const numbers = extractNumbersFromString(line);
    const target = numbers[0];
    const nums = numbers.slice(1);

    const numOperators = nums.length - 1;

    const operators = ['+', '*', '||'];
    for (const currentOperators of generateCombinations(numOperators, ...operators)) {
        try {
            if (evaluateEquationV2(nums, currentOperators) === target) {
                return true;
            }
        } catch (e) {
            continue;
        }
    }
    return false;
}
function second() {
    return getInputAsLines("inputs", "input7.txt")
        .filter(isNotEmptyString)
        .filter(couldBeEquationV2)
        .reduce((acc, line) => {
            const numbers = extractNumbersFromString(line);
            return acc + numbers[0];
        }, 0);
}

export default { first, second };