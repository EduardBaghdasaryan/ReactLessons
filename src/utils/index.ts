import type { Point } from "../interfaces/index";

export const createInitialGrid = (size: number): number[][] =>
  Array(size)
    .fill([])
    .map(() => Array(size).fill(0));

export const leeAlgorithm = (
  start: Point,
  end: Point,
  size: number,
  setGrid: (grid: number[][]) => void
): Point[] => {
  const newGrid = createInitialGrid(size);
  newGrid[start.x][start.y] = 1;

  const queue: [number, number][] = [[start.x, start.y]];

  while (queue.length > 0) {
    const [x = 0, y = 0] = queue.shift() || [];

    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < size &&
        ny >= 0 &&
        ny < size &&
        newGrid[nx][ny] === 0
      ) {
        newGrid[nx][ny] = newGrid[x][y] + 1;

        if (nx === end.x && ny === end.y) {
          const path = backtrackPath(newGrid, end);
          setGrid(newGrid);
          return path;
        }

        queue.push([nx, ny]);
      }
    }
  }

  setGrid(newGrid);
  return [];
};

const backtrackPath = (grid: number[][], end: Point): Point[] => {
  let path: Point[] = [end];
  let [x, y] = [end.x, end.y];
  let step = grid[x][y];

  while (step > 1) {
    // Directions: Down, Right, Up, Left
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < grid.length &&
        ny >= 0 &&
        ny < grid[0].length &&
        grid[nx][ny] === step - 1
      ) {
        path.push({ x: nx, y: ny });
        [x, y] = [nx, ny];
        step -= 1;
        break; // Break after finding the next step in the path
      }
    }
  }

  return path.reverse(); // Reverse to get path from start to end
};
