/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/Cell.css";

const Cell = ({ cell }) => {
  const { isStart, isEnd, isObstacle, isPath, isVisited } = cell;

  // Set class based on cell status
  const cellClass = `
    cell
    ${isStart ? "cell-start" : ""}
    ${isEnd ? "cell-end" : ""}
    ${isObstacle ? "cell-obstacle" : ""}
    ${isPath ? "cell-path" : ""}
    ${isVisited ? "cell-visited" : ""}
  `.trim();

  return <div className={cellClass}></div>;
};

export default Cell;
