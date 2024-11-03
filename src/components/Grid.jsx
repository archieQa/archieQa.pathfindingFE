import { useState, useEffect } from "react";
import Cell from "../components/Cell";
import "../styles/Grid.css";

const Grid = ({ gridSize, start, end, obstacles, path }) => {
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

  // Animate path traversal like a "snake" effect
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

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell) => (
            <Cell key={`${cell.row}-${cell.col}`} cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
