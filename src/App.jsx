// src/App.jsx
import React, { useState } from 'react';
import GraphCanvas from './components/GraphCanvas';
import { initialNodes, initialEdges } from './utils/graphData';
import { primsMST, kruskalsMST, dijkstraSPT, getAlgorithmCode } from './utils/algorithms';
import './App.css';

function App() {
  const [edges, setEdges] = useState(initialEdges);
  const [activeAlgo, setActiveAlgo] = useState(null);
  const [showCode, setShowCode] = useState(false);

  // Helper to reset colors
  const resetGraph = () => {
    setEdges(initialEdges.map(e => ({ ...e, color: '#848484', width: 1 })));
    setActiveAlgo(null);
  };

  // 1. Run Prim's
  const handlePrim = () => {
    resetGraph();
    const mstIds = primsMST(initialNodes, initialEdges);
    highlightEdges(mstIds, 'red');
    setActiveAlgo("Prim's MST (Red)");
  };

  // 2. Run Kruskal's
  const handleKruskal = () => {
    resetGraph();
    const mstIds = kruskalsMST(initialNodes, initialEdges);
    highlightEdges(mstIds, 'blue');
    setActiveAlgo("Kruskal's MST (Blue)");
  };

  // 3. Run Dijkstra's
  const handleDijkstra = () => {
    resetGraph();
    const sptIds = dijkstraSPT(initialNodes, initialEdges);
    highlightEdges(sptIds, 'green');
    setActiveAlgo("Dijkstra's Shortest Path Tree from WS0 (Green)");
  };

  const highlightEdges = (ids, color) => {
    const newEdges = initialEdges.map(edge => {
      if (ids.includes(edge.id)) {
        return { ...edge, color: color, width: 4 };
      }
      return { ...edge, color: '#e0e0e0', width: 1 }; // Fade others
    });
    setEdges(newEdges);
  };

  return (
    <div className="container">
      <header>
        <h1>Agricultural Irrigation Optimization</h1>
        <p>Minimize piping cost using MST & Shortest Path Algorithms</p>
      </header>

      <div className="controls">
        <button onClick={resetGraph}>Reset Graph</button>
        <button className="btn-prim" onClick={handlePrim}>Run Prim's</button>
        <button className="btn-kruskal" onClick={handleKruskal}>Run Kruskal's</button>
        <button className="btn-dijkstra" onClick={handleDijkstra}>Run Dijkstra's</button>
      </div>

      <div className="status">
        {activeAlgo ? <h3>Result: {activeAlgo}</h3> : <h3>Select an Algorithm</h3>}
      </div>

      <GraphCanvas nodes={initialNodes} edges={edges} />

      <div className="bonus-section">
        <button onClick={() => setShowCode(!showCode)}>
          {showCode ? "Hide Code" : "Show Algorithm Code (Bonus)"}
        </button>
        
        {showCode && (
          <pre className="code-display">
            {getAlgorithmCode()}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;