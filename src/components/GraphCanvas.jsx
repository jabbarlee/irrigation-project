// src/components/GraphCanvas.jsx
import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const GraphCanvas = ({ nodes, edges }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    // Initialize data
    const data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges)
    };

    const options = {
      physics: false, // We use fixed coordinates from CSV
      nodes: {
        shape: 'dot',
        size: 20,
        font: { size: 16, strokeWidth: 2, strokeColor: '#ffffff' },
        borderWidth: 2
      },
      edges: {
        width: 1,
        smooth: false,
        font: { align: 'top', size: 12, strokeWidth: 0, background: 'white' }
      }
    };

    // Create Network
    networkRef.current = new Network(containerRef.current, data, options);

    return () => {
      if (networkRef.current) networkRef.current.destroy();
    };
  }, []); // Run once on mount

  // Update edges when props change (e.g. colors update)
  useEffect(() => {
    if (networkRef.current) {
      const edgeData = new DataSet(edges);
      networkRef.current.setData({
        nodes: new DataSet(nodes),
        edges: edgeData
      });
    }
  }, [edges, nodes]);

  return <div ref={containerRef} style={{ height: '500px', border: '2px solid #ddd', borderRadius: '8px' }} />;
};

export default GraphCanvas;