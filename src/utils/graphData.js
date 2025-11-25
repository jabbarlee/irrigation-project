// src/utils/graphData.js

export const initialNodes = [
    { id: 'WS0', label: 'WS0\n(Source)', x: 0, y: 0 },
    { id: 'WS1', label: 'WS1', x: 150, y: -200 }, // Scaled x50, Y flipped for screen coords
    { id: 'WS2', label: 'WS2', x: 250, y: -50 },
    { id: 'WS3', label: 'WS3', x: 450, y: -300 },
    { id: 'WS4', label: 'WS4', x: 350, y: -500 },
    { id: 'WS5', label: 'WS5', x: 600, y: -200 },
  ];
  
  export const initialEdges = [
    { id: 'e1', from: 'WS0', to: 'WS1', label: '5', weight: 5 },
    { id: 'e2', from: 'WS0', to: 'WS2', label: '5.1', weight: 5.1 },
    { id: 'e3', from: 'WS0', to: 'WS3', label: '10.8', weight: 10.8 },
    { id: 'e4', from: 'WS0', to: 'WS4', label: '12.2', weight: 12.2 },
    { id: 'e5', from: 'WS0', to: 'WS5', label: '12.6', weight: 12.6 },
    { id: 'e6', from: 'WS1', to: 'WS2', label: '3.6', weight: 3.6 },
    { id: 'e7', from: 'WS1', to: 'WS3', label: '6.4', weight: 6.4 },
    { id: 'e8', from: 'WS1', to: 'WS4', label: '8.5', weight: 8.5 },
    { id: 'e9', from: 'WS1', to: 'WS5', label: '9.2', weight: 9.2 },
    { id: 'e10', from: 'WS2', to: 'WS3', label: '5.8', weight: 5.8 },
    { id: 'e11', from: 'WS2', to: 'WS4', label: '9.1', weight: 9.1 },
    { id: 'e12', from: 'WS2', to: 'WS5', label: '7.1', weight: 7.1 },
    { id: 'e13', from: 'WS3', to: 'WS4', label: '4.5', weight: 4.5 },
    { id: 'e14', from: 'WS3', to: 'WS5', label: '3.6', weight: 3.6 },
    { id: 'e15', from: 'WS4', to: 'WS5', label: '7.2', weight: 7.2 },
  ];