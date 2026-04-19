// ToolHive™ Backend Server
// Express.js server for ToolToken™ operations and platform management

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const ToolTokenLedger = require('./ledger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize ledger
const ledger = new ToolTokenLedger();

// Data storage files
const USERS_FILE = path.join(__dirname, 'users.json');
const STATS_FILE = path.join(__dirname, 'platform_stats.json');

// Helper functions
async function loadUsers() {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

async function saveUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function loadStats() {
    try {
        const data = await fs.readFile(STATS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {
            totalUsers: 0,
            foundingMembers: [],
            totalReviews: 0,
            totalServices: 0,
            createdAt: new Date().toISOString()
        };
    }
}

async function saveStats(stats) {
    await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
}

// API Routes

// User registration and authentication
app.post('/api/register', async (req, res) => {
    try {
        const { email, name } = req.body;
        
        if (!email || !name) {
            return res.status(400).json({ error: 'Email and name are required' });
        }

        const users = await loadUsers();
        
        if (users[email]) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const stats = await loadStats();
        const newUserCount = stats.totalUsers + 1;
        const isFoundingMember = newUserCount <= 15;

        // Create new user
        const newUser = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            email,
            name,
            createdAt: new Date().toISOString(),
            isFoundingMember,
            reviewCount: 0,
            fiveStarReviews: 0,
            serviceUploads: 0,
            totalEarned: 0,
            totalSpent: 0
        };

        users[email] = newUser;
        await saveUsers(users);

        // Update platform stats
        stats.totalUsers = newUserCount;
        if (isFoundingMember) {
            stats.foundingMembers.push(newUser.id);
        }
        await saveStats(stats);

        // Award founding member bonus if applicable
        if (isFoundingMember) {
            ledger.awardFoundingMemberBonus(newUser.id);
        }

        // Update volatility engine
        ledger.updateVolatilityEngine(newUserCount);

        res.json({
            user: newUser,
            balance: ledger.getBalance(newUser.id),
            rates: ledger.getCurrentRates(),
            isFoundingMember
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Get user balance and info
app.get('/api/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const users = await loadUsers();
        
        const user = Object.values(users).find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const balance = ledger.getBalance(userId);
        const transactions = ledger.getTransactionHistory(userId, 10);

        res.json({
            user,
            balance,
            transactions,
            rates: ledger.getCurrentRates()
        });

    } catch (error) {
        console.error('User info error:', error);
        res.status(500).json({ error: 'Failed to get user info' });
    }
});

// Purchase ToolTokens™
app.post('/api/purchase', async (req, res) => {
    try {
        const { userId, cadAmount } = req.body;
        
        if (!userId || !cadAmount || cadAmount <= 0) {
            return res.status(400).json({ error: 'Invalid purchase parameters' });
        }

        const transaction = ledger.purchaseTokens(userId, parseFloat(cadAmount));
        const newBalance = ledger.getBalance(userId);
        
        // Update user stats
        const users = await loadUsers();
        const user = Object.values(users).find(u => u.id === userId);
        if (user) {
            user.totalSpent += parseFloat(cadAmount);
            await saveUsers(users);
        }

        res.json({
            transaction,
            newBalance,
            rates: ledger.getCurrentRates()
        });

    } catch (error) {
        console.error('Purchase error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Sell ToolTokens™
app.post('/api/sell', async (req, res) => {
    try {
        const { userId, tokenAmount } = req.body;
        
        if (!userId || !tokenAmount || tokenAmount <= 0) {
            return res.status(400).json({ error: 'Invalid sell parameters' });
        }

        const transaction = ledger.sellTokens(userId, parseFloat(tokenAmount));
        const newBalance = ledger.getBalance(userId);
        
        // Update user stats
        const users = await loadUsers();
        const user = Object.values(users).find(u => u.id === userId);
        if (user) {
            user.totalEarned += parseFloat(tokenAmount) * ledger.sellBackRate;
            await saveUsers(users);
        }

        res.json({
            transaction,
            newBalance,
            rates: ledger.getCurrentRates()
        });

    } catch (error) {
        console.error('Sell error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Submit review (triggers reliability mining)
app.post('/api/review', async (req, res) => {
    try {
        const { userId, rating, toolId, comment } = req.body;
        
        if (!userId || !rating || !toolId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const users = await loadUsers();
        const user = Object.values(users).find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user review stats
        user.reviewCount++;
        if (rating === 5) {
            user.fiveStarReviews++;
        }
        await saveUsers(users);

        // Check for reliability mining reward
        let miningReward = null;
        if (user.fiveStarReviews > 0 && user.fiveStarReviews % 5 === 0) {
            miningReward = ledger.rewardReliabilityMining(userId, user.fiveStarReviews);
        }

        const newBalance = ledger.getBalance(userId);

        res.json({
            review: { userId, rating, toolId, comment },
            userStats: {
                reviewCount: user.reviewCount,
                fiveStarReviews: user.fiveStarReviews
            },
            miningReward,
            newBalance
        });

    } catch (error) {
        console.error('Review error:', error);
        res.status(500).json({ error: 'Failed to submit review' });
    }
});

// Upload tool service (triggers maintenance mining)
app.post('/api/service', async (req, res) => {
    try {
        const { userId, toolId, serviceType, description } = req.body;
        
        if (!userId || !toolId || !serviceType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const users = await loadUsers();
        const user = Object.values(users).find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user service stats
        user.serviceUploads++;
        await saveUsers(users);

        // Award maintenance mining reward
        const miningReward = ledger.rewardMaintenanceMining(userId);
        const newBalance = ledger.getBalance(userId);

        // Update platform stats
        const stats = await loadStats();
        stats.totalServices++;
        await saveStats(stats);

        res.json({
            service: { userId, toolId, serviceType, description },
            userStats: {
                serviceUploads: user.serviceUploads
            },
            miningReward,
            newBalance
        });

    } catch (error) {
        console.error('Service upload error:', error);
        res.status(500).json({ error: 'Failed to upload service' });
    }
});

// Get platform statistics
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await loadStats();
        const ledgerStats = ledger.getPlatformStats();
        
        res.json({
            ...stats,
            ...ledgerStats,
            currentRates: ledger.getCurrentRates()
        });

    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to get platform stats' });
    }
});

// Get available tools
app.get('/api/tools', async (req, res) => {
    try {
        // In a real implementation, this would come from a database
        const tools = [
            { id: 'power_drill', name: 'Power Drill', category: 'Power Tools', available: 12, icon: '⚡' },
            { id: 'circular_saw', name: 'Circular Saw', category: 'Power Tools', available: 8, icon: '⚡' },
            { id: 'hammer_set', name: 'Hammer Set', category: 'Hand Tools', available: 15, icon: '🔨' },
            { id: 'screwdriver_set', name: 'Screwdriver Set', category: 'Hand Tools', available: 20, icon: '🔧' },
            { id: 'lawn_mower', name: 'Lawn Mower', category: 'Garden Tools', available: 6, icon: '🌱' },
            { id: 'hedge_trimmer', name: 'Hedge Trimmer', category: 'Garden Tools', available: 4, icon: '🌱' },
            { id: 'paint_sprayer', name: 'Paint Sprayer', category: 'Paint Supplies', available: 3, icon: '🎨' },
            { id: 'paint_roller_set', name: 'Paint Roller Set', category: 'Paint Supplies', available: 8, icon: '🎨' },
            { id: 'pressure_washer', name: 'Pressure Washer', category: 'Cleaning Equipment', available: 2, icon: '🧹' },
            { id: 'shop_vac', name: 'Shop Vac', category: 'Cleaning Equipment', available: 5, icon: '🧹' },
            { id: 'workbench', name: 'Workbench', category: 'Workshop Gear', available: 7, icon: '⚙️' },
            { id: 'tool_chest', name: 'Tool Chest', category: 'Workshop Gear', available: 4, icon: '⚙️' }
        ];

        res.json(tools);

    } catch (error) {
        console.error('Tools error:', error);
        res.status(500).json({ error: 'Failed to get tools' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    const validation = ledger.validateLedger();
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        ledgerValidation: validation
    });
});

// Serve the main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🐝 ToolHive™ Server buzzing on port ${PORT}`);
    console.log(`🌐 Visit http://localhost:${PORT} to access the platform`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🛑 Shutting down ToolHive™ server...');
    
    // Save ledger state
    const ledgerData = ledger.exportLedger();
    await fs.writeFile('ledger_backup.json', JSON.stringify(ledgerData, null, 2));
    
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down ToolHive™ server...');
    
    // Save ledger state
    const ledgerData = ledger.exportLedger();
    await fs.writeFile('ledger_backup.json', JSON.stringify(ledgerData, null, 2));
    
    process.exit(0);
});
