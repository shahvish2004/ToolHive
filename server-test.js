// ToolHive Test Server - Basic functionality without cloud services
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Mock data for testing
const mockUsers = [];
const mockTransactions = [];
const mockTools = [
  { id: 'power_drill', name: 'Power Drill', category: 'Power Tools', available: 12, icon: ' ' },
  { id: 'hammer_set', name: 'Hammer Set', category: 'Hand Tools', available: 8, icon: ' ' },
  { id: 'lawn_mower', name: 'Lawn Mower', category: 'Garden Tools', available: 6, icon: ' ' }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mode: 'test',
    message: 'ToolHive test server running'
  });
});

// Mock registration
app.post('/api/register', (req, res) => {
  const { email, name } = req.body;
  const user = {
    id: 'user_' + Date.now(),
    email,
    name,
    is_founding_member: mockUsers.length < 15,
    balance: mockUsers.length < 15 ? 25.00 : 0.00
  };
  mockUsers.push(user);
  
  res.json({
    user,
    token: 'mock_token_' + Date.now(),
    balance: user.balance,
    isFoundingMember: user.is_founding_member
  });
});

// Mock login
app.post('/api/login', (req, res) => {
  const { email } = req.body;
  const user = mockUsers.find(u => u.email === email);
  
  if (user) {
    res.json({
      user,
      token: 'mock_token_' + Date.now(),
      balance: { balance: user.balance, total_earned: 0, total_spent: 0 }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Mock user profile
app.get('/api/user/profile', (req, res) => {
  res.json({
    user: { id: 'test_user', email: 'test@toolhive.com', name: 'Test User' },
    balance: { balance: 25.00, total_earned: 25.00, total_spent: 0 }
  });
});

// Mock tools
app.get('/api/tools', (req, res) => {
  res.json(mockTools);
});

// Mock stats
app.get('/api/stats', (req, res) => {
  res.json({
    total_users: mockUsers.length,
    total_transactions: mockTransactions.length,
    total_tools: mockTools.length,
    active_users: mockUsers.length,
    founding_members_count: mockUsers.filter(u => u.is_founding_member).length,
    total_supply: 10000 + mockUsers.reduce((sum, u) => sum + u.balance, 0),
    current_purchase_rate: 1.25,
    current_sellback_rate: 0.75
  });
});

// Mock purchase
app.post('/api/purchase', (req, res) => {
  const { cadAmount } = req.body;
  const tokenAmount = cadAmount / 1.25;
  
  res.json({
    clientSecret: 'mock_client_secret',
    tokenAmount,
    purchaseRate: 1.25
  });
});

// Mock review
app.post('/api/review', (req, res) => {
  res.json({
    review: { id: 'review_' + Date.now(), rating: 5 },
    miningReward: { amount: 5, transactionId: 'tx_' + Date.now() },
    newBalance: 30.00
  });
});

// Mock service
app.post('/api/service', (req, res) => {
  res.json({
    service: { id: 'service_' + Date.now() },
    miningReward: { amount: 2, transactionId: 'tx_' + Date.now() },
    newBalance: 27.00
  });
});

// Serve the main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-modern.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n\n`);
  console.log(`\ud83d\udc1d ToolHive Test Server buzzing on port ${PORT}`);
  console.log(`\ud83c\udf10 Visit http://localhost:${PORT} to access the platform`);
  console.log(`\ud83d\udcca API Health: http://localhost:${PORT}/api/health`);
  console.log(`\ud83d\udd12 Mode: Test (no cloud services required)`);
  console.log(`\n\n`);
});

module.exports = app;
