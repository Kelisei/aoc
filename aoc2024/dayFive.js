import { getInputAsLines, extractNumbersFromString } from "./utils.js";

// Loopi boy
export function first() {
  const lines = getInputAsLines("inputs", "input5.txt").slice(0, -1);
  const emptyLineIndex = lines.findIndex((line) => line === "");
  const order = lines.slice(0, emptyLineIndex).map((line) => {
    const [_, x, y] = line.match(/(\d+)\|(\d+)/);
    return { shouldComeBefore: Number(x), shouldComeAfter: Number(y) };
  });

  const updates = lines
    .slice(emptyLineIndex + 1, -1)
    .map(extractNumbersFromString);
  let sum = 0;

  for (const update of updates) {
    if (isUpdateValid(update, order)) {
      sum += update[Math.floor(update.length / 2)];
    }
  }
  return sum;
}

export function second() {
  const lines = getInputAsLines("inputs", "input5.txt");
  const emptyLineIndex = lines.findIndex((line) => line === "");
  const order = lines.slice(0, emptyLineIndex).map((line) => {
    const [_, x, y] = line.match(/(\d+)\|(\d+)/);
    return { shouldComeBefore: Number(x), shouldComeAfter: Number(y) };
  });

  const updates = lines
    .slice(emptyLineIndex + 1, -1)
    .map(extractNumbersFromString);
  let sum = 0;

  for (const update of updates) {
    if (!isUpdateValid(update, order)) {
      const sortedUpdate = orderUpdate(update, order);
      sum += sortedUpdate[Math.floor(sortedUpdate.length / 2)];
    }
  }

  return sum;
}

function isUpdateValid(update, order) {
  for (let i = 0; i < update.length; i++) {
    const current = update[i];
    for (const { shouldComeBefore, shouldComeAfter } of order) {
      const indexOfCheck = update.indexOf(shouldComeAfter);
      if (
        shouldComeBefore === current &&
        indexOfCheck !== -1 &&
        indexOfCheck < i
      ) {
        return false;
      }
    }
  }
  return true;
}

function orderUpdate(update, order) {
  return update.sort((a, b) => {
    for (const { shouldComeBefore, shouldComeAfter } of order) {
      if (a === shouldComeBefore && b === shouldComeAfter) {
        return -1;
      } else if (a === shouldComeAfter && b === shouldComeBefore) {
        return 1;
      }
    }
    return 0;
  });
}

export default { first, second };
