import React, { useState, useEffect } from "react";
import type { Point } from "../interfaces/index";
import Cell from "./Cell";
import { leeAlgorithm, createInitialGrid } from "../utils/index";
import "../styles/grid.styles.css";

const gridSize = 15;

const Grid = () => {
  const [grid, setGrid] = useState(createInitialGrid(gridSize));
  const [start, setStart] = useState<Point | null>(null);
  const [end, setEnd] = useState<Point | null>(null);
  const [path, setPath] = useState<Point[]>([]);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    const newPoint = { x: rowIndex, y: cellIndex };

    if (!start) {
      setStart(newPoint);
      return;
    }

    setEnd(newPoint);
    const shortestPath = leeAlgorithm(start, newPoint, gridSize, setGrid);
    setPath(shortestPath);
  };

  const getCellBgColor = (
    cell: number,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (
      path.length > 0 &&
      !!path.find((point) => point.x === rowIndex && point.y === cellIndex)
    ) {
      return "yellow";
    }

    return start && start.x === rowIndex && start.y === cellIndex
      ? "blue"
      : end && end.x === rowIndex && end.y === cellIndex
      ? "red"
      : cell > 1
      ? "lightgreen"
      : "white";
  };

  const handleReset = () => {
    setStart(null);
    setEnd(null);
    setGrid(createInitialGrid(gridSize));
    setPath([]);
  };

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
              backgroundColor={getCellBgColor(cell, rowIndex, cellIndex)}
            >
              {cell}
            </Cell>
          ))
        )}
      </div>
      <button onClick={handleReset}>Reset Grid</button>
    </>
  );
};

export default Grid;
