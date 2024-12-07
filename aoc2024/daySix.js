import { getInputAsLines, isInBounds } from "./utils.js";


// Took me hours to even get why the second challenge wasn't working properly, now I stand unkown since i just rewrote it till it worked.
// In the end, i've learn that maybe I should try to make things more modular, maybe try the easier approach first and
// then optimize

const directions = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 }
];

function findGuardStartPosition(grid) {
  for (let row = 0; row < grid.length; row++) {
    const col = grid[row].indexOf('^');
    if (col !== -1) {
      return { col, row, direction: 0 };
    }
  }
  throw new Error("Guard start position not found");
}

export function first() {
  const grid = getInputAsLines("inputs", "input6.txt").slice(0, -1);
  const guard = findGuardStartPosition(grid);
  const visitedPositions = new Set();

  while (true) {
    visitedPositions.add(`${guard.col},${guard.row}`);
    const { dx, dy } = directions[guard.direction];
    const newX = guard.col + dx;
    const newY = guard.row + dy;

    if (!isInBounds(guard.col, guard.row, dx, dy, grid)) {
      break;
    }

    if (grid[newY][newX] === "#") {
      guard.direction = (guard.direction + 1) % directions.length;
    } else {
      guard.col = newX;
      guard.row = newY;
    }
  }

  return visitedPositions.size;
}

function simulateGuardPath(grid) {
  const gridCopy = grid.map(row => [...row]);
  let guard = { col: -1, row: -1, direction: 0 };

  gridCopy.some((line, i) => {
    const x = line.indexOf("^");
    if (x !== -1) {
      guard.col = x;
      guard.row = i;
      return true;
    }
  });

  const visitedStates = new Set();

  while (true) {
    const stateKey = `${guard.col},${guard.row},${guard.direction}`;
    if (visitedStates.has(stateKey)) {
      return true;
    }

    visitedStates.add(stateKey);

    const { dx, dy } = directions[guard.direction];
    const newX = guard.col + dx;
    const newY = guard.row + dy;

    if (!isInBounds(guard.col, guard.row, dx, dy, gridCopy)) {
      return false;
    }

    if (gridCopy[newY][newX] === "#") {
      guard.direction = (guard.direction + 1) % directions.length;
    } else {
      guard.col = newX;
      guard.row = newY;
    }
  }
}

function findGuardPath(grid) {
  const pathPositions = new Set();
  let guard = { col: -1, row: -1, direction: 0 };

  grid.some((line, i) => {
    const x = line.indexOf("^");
    if (x !== -1) {
      guard.col = x;
      guard.row = i;
      return true;
    }
    return false;
  });

  let reachedEnd = false;
  pathPositions.add(`${guard.col},${guard.row}`);

  while (!reachedEnd) {
    const { dx, dy } = directions[guard.direction];
    const newX = guard.col + dx;
    const newY = guard.row + dy;

    if (isInBounds(guard.col, guard.row, dx, dy, grid)) {
      if (grid[newY][newX] === "#") {
        guard.direction = (guard.direction + 1) % directions.length;
      } else {
        guard.col = newX;
        guard.row = newY;
        pathPositions.add(`${guard.col},${guard.row}`);
      }
    } else {
      reachedEnd = true;
    }
  }

  return pathPositions;
}

export async function second() {
  const originalGrid = getInputAsLines("inputs", "input6.txt").slice(0, -1).map(line => line.split(""));

  const startRow = originalGrid.findIndex(row => row.includes('^'));
  const startCol = originalGrid[startRow].indexOf('^');

  const guardPath = findGuardPath(originalGrid);
  const promises = [];
  for (const pos of guardPath) {
    const [col, row] = pos.split(',').map(Number);

    if (row === startRow && col === startCol) continue;

    const testGrid = originalGrid.map(row => [...row]);
    testGrid[row][col] = '#';

    promises.push(
      new Promise((resolve) => {
        const result = simulateGuardPath(testGrid);
        resolve(result);
      })
    );
  }
  const results = await Promise.all(promises);
  return results.filter(result => result).length;
}

export default { first, second };