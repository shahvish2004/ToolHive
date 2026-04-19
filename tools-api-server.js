// Simple test server for tools API
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock tools data
const mockTools = [
  {
    id: '1',
    name: 'Power Drill',
    icon: '🔧',
    available: 12,
    description: 'Heavy duty power drill for all projects'
  },
  {
    id: '2', 
    name: 'Hammer Set',
    icon: '🔨',
    available: 8,
    description: 'Professional hammer set with various sizes'
  },
  {
    id: '3',
    name: 'Lawn Mower',
    icon: '🌱',
    available: 6,
    description: 'Electric lawn mower for medium yards'
  },
  {
    id: '4',
    name: 'Circular Saw',
    icon: '⚡',
    available: 4,
    description: 'Precision circular saw for woodworking'
  },
  {
    id: '5',
    name: 'Pressure Washer',
    icon: '💧',
    available: 7,
    description: 'High pressure washer for tough cleaning'
  },
  {
    id: '6',
    name: 'Orbital Sander',
    icon: '🔧',
    available: 9,
    description: 'Smooth finish orbital sander'
  }
];

// Tools API endpoint
app.get('/api/tools', (req, res) => {
  console.log('Tools API called - returning mock data');
  res.json(mockTools);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    message: 'Tools API server running'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔧 Tools API server running on port ${PORT}`);
  console.log(`📊 Tools endpoint: http://localhost:${PORT}/api/tools`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
