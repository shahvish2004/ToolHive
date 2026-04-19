# ToolHive™ - Community-Powered Tool Sharing Platform

## Overview

ToolHive™ is a comprehensive tool sharing platform with an integrated token economy system. The platform enables community members to borrow and lend tools while earning rewards through our proprietary ToolToken™ system.

## 🎯 Key Features

### Brand Identity
- **Name**: ToolHive™
- **Tagline**: "Borrow • Lend • Let's Build it Together"
- **Mascot**: Wrench-Bee (image_22.png)
- **Colors**: Construction Amber (#F59E0B) & Deep Slate (#1E293B)

### Visual Design
- Hexagonal clip-path design (12% polygon) on all cards and buttons
- Honeycomb grid layout for tool discovery
- Responsive design with modern UI/UX

### Token Economy (ToolToken™)
- **Purchase Rate**: $1.25 CAD = 1 TT
- **Sell-Back Rate**: $0.75 CAD = 1 TT (with volatility engine)
- **Volatility Engine**: Rate increases by $0.01 per 100 new users (capped at $1.00)

### Social Mining Rewards
- **Reliability Mining**: 5 TT for every five 5-star reviews
- **Maintenance Mining**: 2 TT for verified tool service uploads
- **Founding Member Bonus**: 25 TT for first 15 users

### Technical Architecture
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Ledger System**: Private blockchain-mirrored ledger
- **Data Storage**: JSON files with backup system

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # Navigate to the project directory
   cd windsurf-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the platform**
   - Open your browser and navigate to: `http://localhost:3000`
   - The API will be available at: `http://localhost:3000/api`

### Development Mode

For development with automatic restart:
```bash
npm run dev
```

## 📁 Project Structure

```
windsurf-project/
├── index.html              # Main frontend application
├── server.js               # Express.js backend server
├── ledger.js              # ToolToken™ ledger system
├── package.json           # Node.js dependencies
├── README.md              # This file
├── image_22.png           # Wrench-Bee mascot
├── users.json             # User data (auto-generated)
├── platform_stats.json    # Platform statistics (auto-generated)
└── ledger_backup.json     # Ledger backup (auto-generated)
```

## 🔧 API Endpoints

### User Management
- `POST /api/register` - Register new user
- `GET /api/user/:userId` - Get user information and balance

### Token Operations
- `POST /api/purchase` - Purchase ToolTokens™
- `POST /api/sell` - Sell ToolTokens™

### Platform Features
- `POST /api/review` - Submit tool review (triggers mining)
- `POST /api/service` - Upload tool service (triggers mining)
- `GET /api/tools` - Get available tools
- `GET /api/stats` - Get platform statistics

### System
- `GET /api/health` - Health check and ledger validation

## 💡 Usage Guide

### For New Users
1. Click "Start Building Together" to register
2. First 15 users receive 25 TT founding bonus
3. Purchase TT tokens to participate in the economy
4. Browse tools and start borrowing/lending

### Earning ToolTokens™
1. **Reliability Mining**: Provide excellent service and get 5-star reviews
2. **Maintenance Mining**: Upload verified tool service records
3. **Trading**: Buy low, sell high as the platform grows

### Platform Growth
- As more users join, the sell-back rate increases
- Active community members benefit from the volatility engine
- All transactions are recorded in the private ledger

## 🔒 Security & Privacy

- No crypto-jargon in the user interface
- Private blockchain-mirrored ledger system
- Local data storage with backup capabilities
- User data protected and anonymized

## 📞 Contact & Support

- **Email**: hello@toolhive.com
- **Team**: The ToolHive™ Team
- **Legal**: ToolHive™ and ToolToken™ are common law trademarks. Not affiliated with Hive AI or Hive Home.

## 🛠️ Development Notes

### Frontend Features
- Responsive hexagonal design
- Real-time wallet updates
- Modal-based onboarding
- Offline fallback functionality

### Backend Features
- RESTful API design
- Comprehensive error handling
- Data persistence and backup
- Ledger integrity validation

### Token Economy
- Volatility engine tied to user growth
- Automated mining rewards
- Transaction history tracking
- Platform-wide statistics

## 📜 License

This project is proprietary and confidential. All rights reserved by the ToolHive™ Team.

## 🔄 Updates & Maintenance

The platform automatically:
- Backs up ledger data on shutdown
- Validates ledger integrity
- Updates volatility rates based on growth
- Maintains user statistics

---

**Built with ❤️ by the ToolHive™ Team**
