# ToolHive - Modern Cloud Platform

## Overview

ToolHive is a production-ready tool sharing platform built with modern cloud services including **Supabase**, **Stripe**, **Vercel**, and **GitHub Actions**. This version provides enterprise-grade authentication, payment processing, and deployment infrastructure.

## Modern Tech Stack

### Frontend
- **HTML5/CSS3/JavaScript** (Vanilla)
- **Supabase Auth** for user authentication
- **Stripe Elements** for payment processing
- **Responsive hexagonal design**

### Backend
- **Node.js/Express.js** API server
- **Supabase PostgreSQL** database
- **Stripe** for payment processing
- **JWT** for session management

### Infrastructure
- **Vercel** for frontend hosting
- **Supabase** for database and auth
- **GitHub Actions** for CI/CD
- **Stripe** for payment infrastructure

## Quick Start

### Prerequisites
- Node.js 16.0 or higher
- Supabase account and project
- Stripe account
- Vercel account
- GitHub repository

### 1. Environment Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd toolhive-platform

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your actual credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application Configuration
NODE_ENV=production
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

### 3. Database Setup

Run the Supabase schema:

```sql
-- Execute the contents of supabase-schema.sql in your Supabase project
-- This will create all necessary tables, functions, and policies
```

### 4. Local Development

```bash
# Start the development server
npm run dev

# The platform will be available at http://localhost:3000
```

## Deployment

### Vercel Deployment

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### GitHub Actions CI/CD

The platform includes automated:

- **Testing**: Unit tests and health checks
- **Deployment**: Automatic deployment to Vercel
- **Preview**: Preview deployments for develop branch

### Manual Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login User
```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/user/profile
Authorization: Bearer <jwt_token>
```

### Token Operations

#### Purchase ToolTokens
```http
POST /api/purchase
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "cadAmount": 25.00
}
```

#### Get User Transactions
```http
GET /api/user/transactions
Authorization: Bearer <jwt_token>
```

### Platform Features

#### Get Available Tools
```http
GET /api/tools
```

#### Submit Review
```http
POST /api/review
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "toolId": "tool-uuid",
  "rating": 5,
  "comment": "Excellent tool!"
}
```

#### Upload Service Record
```http
POST /api/service
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "toolId": "tool-uuid",
  "serviceType": "maintenance",
  "description": "Replaced worn parts"
}
```

## Database Schema

### Core Tables

- **users**: User profiles and authentication
- **token_balances**: ToolToken balances and statistics
- **transactions**: Complete transaction ledger
- **tools**: Tool catalog and availability
- **tool_rentals**: Borrowing/lending records
- **reviews**: User ratings and feedback
- **service_records**: Maintenance and service logs
- **platform_stats**: Platform-wide statistics

### Security Features

- **Row Level Security (RLS)** on all user data
- **JWT token authentication**
- **Stripe payment security**
- **Audit logging for all operations**

## Stripe Integration

### Payment Flow

1. **User initiates purchase** via frontend
2. **Payment Intent created** on server
3. **Stripe Elements** handles card payment
4. **Webhook confirms** successful payment
5. **Tokens credited** to user account

### Webhook Configuration

Set up webhook endpoint: `https://your-domain.com/api/stripe/webhook`

Required events:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

## Supabase Features

### Authentication

- **Email/Password** authentication
- **Social providers** (Google, GitHub, etc.)
- **Row Level Security** for data protection
- **JWT token management**

### Database

- **PostgreSQL** backend
- **Real-time subscriptions**
- **Automatic backups**
- **Edge functions** support

## Monitoring & Analytics

### Health Checks

```bash
# API Health
curl https://your-domain.com/api/health

# Response
{
  "status": "healthy",
  "timestamp": "2026-04-17T05:50:57.290Z",
  "supabase": "connected",
  "stripe": "connected"
}
```

### Platform Statistics

Access real-time platform data:
- Total users and transactions
- Token supply and rates
- Tool availability metrics
- Mining rewards statistics

## Security Best Practices

### Environment Security
- Use **environment variables** for all secrets
- Enable **HTTPS** in production
- Implement **CORS** policies
- Set **webhook secrets** for Stripe

### Database Security
- Enable **Row Level Security**
- Use **service role key** only server-side
- Implement **audit logging**
- Regular **backup testing**

### Application Security
- **JWT token** expiration
- **Input validation** on all endpoints
- **Rate limiting** for API calls
- **Error handling** without information leakage

## Performance Optimization

### Frontend
- **Lazy loading** for tool images
- **Debounced API calls**
- **Service worker** for caching
- **Optimized images** with WebP

### Backend
- **Database indexing** on queries
- **Connection pooling** for Supabase
- **Response caching** where appropriate
- **API rate limiting**

## Troubleshooting

### Common Issues

#### Supabase Connection
```bash
# Check Supabase URL and keys
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### Stripe Integration
```bash
# Verify Stripe keys
stripe --version
stripe keys list
```

#### Deployment Issues
```bash
# Check Vercel logs
vercel logs

# Verify environment variables
vercel env ls
```

### Debug Mode

Enable debug logging:
```bash
DEBUG=toolhive:* npm run dev
```

## Contributing

1. **Fork** the repository
2. **Create** feature branch
3. **Make** changes with tests
4. **Submit** pull request
5. **Deploy** via GitHub Actions

## License

This project is proprietary and confidential. All rights reserved by the ToolHive Team.

## Support

- **Email**: hello@toolhive.com
- **Documentation**: Available in this README
- **Issues**: Create GitHub issue for bugs

---

**Built with modern cloud services by the ToolHive Team**
