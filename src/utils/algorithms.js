// src/utils/algorithms.js

// --- HELPER: Union-Find for Kruskal's ---
class UnionFind {
    constructor(elements) {
      this.parent = {};
      elements.forEach(e => (this.parent[e] = e));
    }
    find(id) {
      if (this.parent[id] === id) return id;
      return (this.parent[id] = this.find(this.parent[id]));
    }
    union(a, b) {
      const rootA = this.find(a);
      const rootB = this.find(b);
      if (rootA !== rootB) {
        this.parent[rootA] = rootB;
        return true;
      }
      return false;
    }
  }
  
  // --- 1. PRIM'S ALGORITHM (MST) ---
  export const primsMST = (nodes, edges) => {
    let mstEdges = [];
    let visited = new Set();
    let startNode = nodes[0].id; // Start at WS0
  
    visited.add(startNode);
  
    while (visited.size < nodes.length) {
      let minEdge = null;
      let minWeight = Infinity;
  
      // Find smallest edge connecting visited to unvisited
      edges.forEach(edge => {
        let u = edge.from;
        let v = edge.to;
        
        // One node in visited, one not
        if ((visited.has(u) && !visited.has(v)) || (visited.has(v) && !visited.has(u))) {
          if (edge.weight < minWeight) {
            minWeight = edge.weight;
            minEdge = edge;
          }
        }
      });
  
      if (minEdge) {
        mstEdges.push(minEdge.id);
        visited.add(visited.has(minEdge.from) ? minEdge.to : minEdge.from);
      } else {
        break; // Graph might be disconnected
      }
    }
    return mstEdges;
  };
  
  // --- 2. KRUSKAL'S ALGORITHM (MST) ---
  export const kruskalsMST = (nodes, edges) => {
    // 1. Sort edges by weight
    let sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    
    let mstEdges = [];
    let uf = new UnionFind(nodes.map(n => n.id));
  
    // 2. Iterate and select
    sortedEdges.forEach(edge => {
      if (uf.union(edge.from, edge.to)) {
        mstEdges.push(edge.id);
      }
    });
  
    return mstEdges;
  };
  
  // --- 3. DIJKSTRA'S ALGORITHM (Shortest Path Tree from WS0) ---
  export const dijkstraSPT = (nodes, edges) => {
    const startNode = 'WS0';
    let distances = {};
    let prevEdge = {}; // To store the edge that got us here
    let unvisited = new Set(nodes.map(n => n.id));
  
    // Init
    nodes.forEach(n => (distances[n.id] = Infinity));
    distances[startNode] = 0;
  
    while (unvisited.size > 0) {
      // Find unvisited node with smallest distance
      let currentNode = null;
      let minDist = Infinity;
      
      unvisited.forEach(nodeId => {
        if (distances[nodeId] < minDist) {
          minDist = distances[nodeId];
          currentNode = nodeId;
        }
      });
  
      if (!currentNode) break; // Remaining nodes are unreachable
      unvisited.delete(currentNode);
  
      // Check neighbors
      edges.forEach(edge => {
        let neighbor = null;
        if (edge.from === currentNode) neighbor = edge.to;
        else if (edge.to === currentNode) neighbor = edge.from;
  
        if (neighbor && unvisited.has(neighbor)) {
          let newDist = distances[currentNode] + edge.weight;
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            prevEdge[neighbor] = edge.id; // Store the edge used
          }
        }
      });
    }
  
    // Return all edges that form the Shortest Path Tree
    return Object.values(prevEdge);
  };
  
  // --- BONUS: CODE DISPLAY STRING ---
  export const getAlgorithmCode = () => {
    return `
  // Prim's Algorithm Logic
  ${primsMST.toString()}
  
  // Kruskal's Algorithm Logic
  ${kruskalsMST.toString()}
  
  // Dijkstra's Algorithm Logic
  ${dijkstraSPT.toString()}
    `;
  };