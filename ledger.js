// ToolHive™ Private Blockchain-Mirrored Ledger System
// This is a simplified internal ledger that mirrors blockchain behavior
// without exposing crypto terminology to users

class ToolTokenLedger {
    constructor() {
        this.transactions = [];
        this.userBalances = new Map();
        this.totalSupply = 0;
        this.purchaseRate = 1.25; // $1.25 CAD = 1 TT
        this.sellBackRate = 0.75; // $0.75 CAD = 1 TT
        this.activeUsers = 0;
        this.miningRewards = {
            reliability: 5,    // 5 TT for 5 five-star reviews
            maintenance: 2     // 2 TT for verified tool service uploads
        };
        
        // Initialize with some genesis transactions
        this.initializeGenesis();
    }

    // Initialize the ledger with genesis block
    initializeGenesis() {
        const genesisTransaction = {
            id: this.generateTransactionId(),
            timestamp: new Date().toISOString(),
            type: 'genesis',
            from: 'system',
            to: 'treasury',
            amount: 10000, // Initial supply
            description: 'Genesis: Initial ToolToken™ supply',
            blockHeight: 0,
            hash: this.calculateHash({
                id: 'genesis',
                timestamp: new Date().toISOString(),
                amount: 10000
            })
        };

        this.transactions.push(genesisTransaction);
        this.totalSupply = 10000;
        this.userBalances.set('treasury', 10000);
    }

    // Generate unique transaction ID
    generateTransactionId() {
        return 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Calculate hash for transaction (simplified)
    calculateHash(transaction) {
        const data = JSON.stringify(transaction);
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return 'hash_' + Math.abs(hash).toString(16);
    }

    // Purchase ToolTokens™
    purchaseTokens(userId, cadAmount) {
        const tokenAmount = cadAmount / this.purchaseRate;
        
        if (tokenAmount <= 0) {
            throw new Error('Invalid purchase amount');
        }

        const transaction = {
            id: this.generateTransactionId(),
            timestamp: new Date().toISOString(),
            type: 'purchase',
            from: 'treasury',
            to: userId,
            amount: tokenAmount,
            cadAmount: cadAmount,
            rate: this.purchaseRate,
            description: `Purchase: ${tokenAmount.toFixed(2)} TT for $${cadAmount.toFixed(2)} CAD`,
            blockHeight: this.transactions.length,
            hash: null
        };

        transaction.hash = this.calculateHash(transaction);
        
        // Update balances
        const currentTreasuryBalance = this.userBalances.get('treasury') || 0;
        const currentUserBalance = this.userBalances.get(userId) || 0;
        
        if (currentTreasuryBalance < tokenAmount) {
            throw new Error('Insufficient treasury supply');
        }

        this.userBalances.set('treasury', currentTreasuryBalance - tokenAmount);
        this.userBalances.set(userId, currentUserBalance + tokenAmount);
        
        this.transactions.push(transaction);
        
        return transaction;
    }

    // Sell ToolTokens™
    sellTokens(userId, tokenAmount) {
        const cadAmount = tokenAmount * this.sellBackRate;
        
        if (tokenAmount <= 0) {
            throw new Error('Invalid sell amount');
        }

        const currentUserBalance = this.userBalances.get(userId) || 0;
        
        if (currentUserBalance < tokenAmount) {
            throw new Error('Insufficient TT balance');
        }

        const transaction = {
            id: this.generateTransactionId(),
            timestamp: new Date().toISOString(),
            type: 'sell',
            from: userId,
            to: 'treasury',
            amount: tokenAmount,
            cadAmount: cadAmount,
            rate: this.sellBackRate,
            description: `Sell: ${tokenAmount.toFixed(2)} TT for $${cadAmount.toFixed(2)} CAD`,
            blockHeight: this.transactions.length,
            hash: null
        };

        transaction.hash = this.calculateHash(transaction);
        
        // Update balances
        const currentTreasuryBalance = this.userBalances.get('treasury') || 0;
        
        this.userBalances.set('treasury', currentTreasuryBalance + tokenAmount);
        this.userBalances.set(userId, currentUserBalance - tokenAmount);
        
        this.transactions.push(transaction);
        
        return transaction;
    }

    // Reward mining (Reliability Mining)
    rewardReliabilityMining(userId, reviewCount) {
        if (reviewCount >= 5) {
            const rewardAmount = this.miningRewards.reliability;
            
            const transaction = {
                id: this.generateTransactionId(),
                timestamp: new Date().toISOString(),
                type: 'mining_reward',
                from: 'system',
                to: userId,
                amount: rewardAmount,
                description: `Community Growth Bonus: Reliability Mining - ${reviewCount} 5-star reviews`,
                blockHeight: this.transactions.length,
                hash: null
            };

            transaction.hash = this.calculateHash(transaction);
            
            const currentBalance = this.userBalances.get(userId) || 0;
            this.userBalances.set(userId, currentBalance + rewardAmount);
            this.totalSupply += rewardAmount;
            
            this.transactions.push(transaction);
            
            return transaction;
        }
        
        return null;
    }

    // Reward mining (Maintenance Mining)
    rewardMaintenanceMining(userId) {
        const rewardAmount = this.miningRewards.maintenance;
        
        const transaction = {
            id: this.generateTransactionId(),
            timestamp: new Date().toISOString(),
            type: 'mining_reward',
            from: 'system',
            to: userId,
            amount: rewardAmount,
            description: 'Community Growth Bonus: Maintenance Mining - Verified tool service upload',
            blockHeight: this.transactions.length,
            hash: null
        };

        transaction.hash = this.calculateHash(transaction);
        
        const currentBalance = this.userBalances.get(userId) || 0;
        this.userBalances.set(userId, currentBalance + rewardAmount);
        this.totalSupply += rewardAmount;
        
        this.transactions.push(transaction);
        
        return transaction;
    }

    // Founding member bonus
    awardFoundingMemberBonus(userId) {
        const bonusAmount = 25.00;
        
        const transaction = {
            id: this.generateTransactionId(),
            timestamp: new Date().toISOString(),
            type: 'founding_bonus',
            from: 'system',
            to: userId,
            amount: bonusAmount,
            description: 'Founding Member Welcome Bonus - First 15 members',
            blockHeight: this.transactions.length,
            hash: null
        };

        transaction.hash = this.calculateHash(transaction);
        
        const currentBalance = this.userBalances.get(userId) || 0;
        this.userBalances.set(userId, currentBalance + bonusAmount);
        this.totalSupply += bonusAmount;
        
        this.transactions.push(transaction);
        
        return transaction;
    }

    // Update volatility engine based on platform popularity
    updateVolatilityEngine(newActiveUsers) {
        this.activeUsers = newActiveUsers;
        
        // Increase sell-back rate by $0.01 for every 100 new active users
        const growthFactor = Math.floor(newActiveUsers / 100);
        const volatilityBonus = Math.min(growthFactor * 0.01, 0.25); // Cap at $1.00 ($0.75 + $0.25)
        
        this.sellBackRate = 0.75 + volatilityBonus;
        
        return this.sellBackRate;
    }

    // Get user balance
    getBalance(userId) {
        return this.userBalances.get(userId) || 0;
    }

    // Get transaction history for user
    getTransactionHistory(userId, limit = 50) {
        return this.transactions
            .filter(tx => tx.from === userId || tx.to === userId)
            .slice(-limit)
            .reverse();
    }

    // Get current rates
    getCurrentRates() {
        return {
            purchase: this.purchaseRate,
            sellBack: this.sellBackRate,
            spread: this.purchaseRate - this.sellBackRate
        };
    }

    // Get platform statistics
    getPlatformStats() {
        const userTransactions = this.transactions.filter(tx => 
            tx.type === 'purchase' || tx.type === 'sell'
        );
        
        return {
            totalTransactions: this.transactions.length,
            userTransactions: userTransactions.length,
            totalSupply: this.totalSupply,
            activeUsers: this.activeUsers,
            currentRates: this.getCurrentRates(),
            treasuryBalance: this.userBalances.get('treasury') || 0
        };
    }

    // Validate ledger integrity
    validateLedger() {
        let calculatedSupply = 0;
        
        for (const [userId, balance] of this.userBalances.entries()) {
            calculatedSupply += balance;
        }
        
        const isValid = Math.abs(calculatedSupply - this.totalSupply) < 0.01;
        
        return {
            isValid,
            calculatedSupply,
            recordedSupply: this.totalSupply,
            discrepancy: Math.abs(calculatedSupply - this.totalSupply)
        };
    }

    // Export ledger data (for backup/migration)
    exportLedger() {
        return {
            transactions: this.transactions,
            userBalances: Object.fromEntries(this.userBalances),
            totalSupply: this.totalSupply,
            purchaseRate: this.purchaseRate,
            sellBackRate: this.sellBackRate,
            activeUsers: this.activeUsers,
            miningRewards: this.miningRewards,
            exportTimestamp: new Date().toISOString()
        };
    }

    // Import ledger data (for recovery)
    importLedger(data) {
        this.transactions = data.transactions || [];
        this.userBalances = new Map(Object.entries(data.userBalances || {}));
        this.totalSupply = data.totalSupply || 0;
        this.purchaseRate = data.purchaseRate || 1.25;
        this.sellBackRate = data.sellBackRate || 0.75;
        this.activeUsers = data.activeUsers || 0;
        this.miningRewards = data.miningRewards || { reliability: 5, maintenance: 2 };
    }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ToolTokenLedger;
} else if (typeof window !== 'undefined') {
    window.ToolTokenLedger = ToolTokenLedger;
}
