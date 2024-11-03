import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import "../styles/Grid.css";

const Grid = ({ gridSize, start, end, obstacles, path, onCellClick }) => {
  const [grid, setGrid] = useState([]);

  // Initialize grid with start, end, and obstacles
  useEffect(() => {
    const initializeGrid = () => {
      return Array.from({ length: gridSize.rows }, (_, row) =>
        Array.from({ length: gridSize.cols }, (_, col) => ({
          row,
          col,
          isStart: row === start.row && col === start.col,
          isEnd: row === end.row && col === end.col,
          isObstacle: obstacles.some((ob) => ob.row === row && ob.col === col),
          isPath: false,
        }))
      );
    };
    setGrid(initializeGrid());
  }, [gridSize, start, end, obstacles]);

  // Animate path traversal
  useEffect(() => {
    if (path.length) {
      path.forEach((cell, index) => {
        setTimeout(() => {
          setGrid((prevGrid) =>
            prevGrid.map((row) =>
              row.map((c) => ({
                ...c,
                isPath: c.isPath || (c.row === cell.row && c.col === cell.col),
              }))
            )
          );
        }, index * 200); // Adjust delay for animation speed
      });
    }
  }, [path]);

  // Flatten grid array for rendering all cells in one container
  const flatGrid = grid.flat();

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${gridSize.cols}, 20px)` }}
    >
      {flatGrid.map((cell) => (
        <Cell
          key={`${cell.row}-${cell.col}`}
          cell={cell}
          onClick={() => onCellClick(cell.row, cell.col)}
        />
      ))}
    </div>
  );
};

export default Grid;
