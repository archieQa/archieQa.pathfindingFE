import { useState } from "react";
import Grid from "./components/Grid";

function App() {
  const [gridSize, setGridSize] = useState({ rows: 5, cols: 5 });
  const [start, setStart] = useState({ row: 0, col: 0 });
  const [end, setEnd] = useState({ row: 4, col: 4 });
  const [obstacles, setObstacles] = useState([]);
  const [path, setPath] = useState([]);
  const [algorithm, setAlgorithm] = useState("a_star");

  // Fetch path from backend
  const fetchPath = async () => {
    try {
      const response = await fetch("http://localhost:5000/find-path", {
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

  // Update grid settings based on user input
  const handleGridSizeChange = (e) => {
    setGridSize({ ...gridSize, [e.target.name]: Number(e.target.value) });
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div>
      <h1>Pathfinding Visualizer</h1>
      <div className="controls">
        <label>
          Rows:
          <input
            type="number"
            name="rows"
            value={gridSize.rows}
            onChange={handleGridSizeChange}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            name="cols"
            value={gridSize.cols}
            onChange={handleGridSizeChange}
          />
        </label>
        <label>
          Algorithm:
          <select value={algorithm} onChange={handleAlgorithmChange}>
            <option value="a_star">A*</option>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
            <option value="dijkstra">Dijkstra</option>
          </select>
        </label>
        <button onClick={fetchPath}>Start Pathfinding</button>
      </div>
      <Grid
        gridSize={gridSize}
        start={start}
        end={end}
        obstacles={obstacles}
        path={path}
      />
    </div>
  );
}

export default App;
