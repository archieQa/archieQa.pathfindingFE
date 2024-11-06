import { useState } from "react";
import Grid from "./components/Grid";
import "./App.css"; // Import the new stylesheet for styling

function App() {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [end, setEnd] = useState({ row: 4, col: 4 });
  const [obstacles, setObstacles] = useState([]);
  const [path, setPath] = useState([]);
  const [algorithm, setAlgorithm] = useState("a_star");
  const [mode, setMode] = useState("start");

  const url = import.meta.env.VITE_API_URL || "http://localhost:5000/";
  console.log("API URL:", url);
  const gridSize = { rows, cols };

  const handleCellClick = (row, col) => {
    if (mode === "start") {
      setStart({ row, col });
    } else if (mode === "end") {
      setEnd({ row, col });
    } else if (mode === "obstacle") {
      setObstacles((prev) => {
        const exists = prev.some((ob) => ob.row === row && ob.col === col);
        return exists
          ? prev.filter((ob) => ob.row !== row || ob.col !== col)
          : [...prev, { row, col }];
      });
    }
  };

  // Fetch the path from the API
  const fetchPath = async () => {
    try {
      const response = await fetch(`${url}find-path`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm, gridSize, start, end, obstacles }),
      });
      const data = await response.json();
      setPath(data.path);
    } catch (error) {
      console.error("Error fetching path:", error);
    }
  };

  const resetGrid = () => {
    setPath([]);
    setStart({ row: 0, col: 0 });
    setEnd({ row: rows - 1, col: cols - 1 });
    setObstacles([]);
  };

  return (
    <div className="app-container">
      <button className="reset-button" onClick={resetGrid}>
        Restart
      </button>
      <div className="grid-container">
        <h1>Pathfinding Visualizer</h1>
        <Grid
          gridSize={gridSize}
          start={start}
          end={end}
          obstacles={obstacles}
          path={path}
          onCellClick={handleCellClick}
        />
      </div>
      <div className="controls">
        <label>
          Rows:
          <input
            type="number"
            min="1"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value, 10) || 1)}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            min="1"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value, 10) || 1)}
          />
        </label>
        <label>
          Algorithm:
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="a_star">A*</option>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
            <option value="dijkstra">Dijkstra</option>
          </select>
        </label>
        <button onClick={() => setMode("start")}>Set Start Point</button>
        <button onClick={() => setMode("end")}>Set End Point</button>
        <button onClick={() => setMode("obstacle")}>
          Add/Remove Obstacles
        </button>
        <button onClick={fetchPath}>Start Pathfinding</button>
      </div>
    </div>
  );
}

export default App;
