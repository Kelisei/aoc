import { getInputAsLines, logInBox, isInBounds } from "./utils.js";

function first() {
  const grid = getInputAsLines("inputs", "input6.txt").slice(0, -1);
  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 1, dy: 0 }, // Right
    { dx: 0, dy: 1 }, // Down
    { dx: -1, dy: 0 }, // Left
  ];
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
  logInBox("Guard starting pos", JSON.stringify(guard));
  let reachedEnd = false;
  let visitedPositions = new Set();
  visitedPositions.add(`${guard.col},${guard.row}`);

  while (!reachedEnd) {
    visitedPositions.add(`${guard.col},${guard.row}`);
    const { dx, dy } = directions[guard.direction];
    const newX = guard.col + dx;
    const newY = guard.row + dy;
    if (newX >= 0 && newY >= 0 && newX < grid[0].length && newY < grid.length) {
      if (grid[newY][newX] === "#") {
        guard.direction = (guard.direction + 1) % directions.length;
      } else {
        guard.col = newX;
        guard.row = newY;
      }
    } else {
      reachedEnd = true;
    }
  }
  logInBox(
    "Count of distinct places the guard has been",
    visitedPositions.size,
  );
  logInBox("Positions of the guard", JSON.stringify(guard));
}

first();
