import React from "react";
import "../styles/Cell.css";

const Cell = ({ cell, onClick }) => {
  const { isStart, isEnd, isObstacle, isPath } = cell;

  const cellClass = `
    cell
    ${isStart ? "cell-start" : ""}
    ${isEnd ? "cell-end" : ""}
    ${isObstacle ? "cell-obstacle" : ""}
    ${isPath ? "cell-path" : ""}
  `.trim();

  return <div className={cellClass} onClick={onClick}></div>;
};

export default Cell;
