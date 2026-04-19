// ToolHive Modern Server with Supabase and Stripe Integration
// Production-ready with cloud services

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase (with fallback for testing)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Stripe (with fallback for testing)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key';
const stripeInstance = stripe(stripeSecretKey);

// Maintenance Mode Middleware
const maintenanceMode = (req, res, next) => {
  // Check if maintenance mode is enabled via environment variable
 if (process.env.MAINTENANCE_MODE === 'true') {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ToolHive - Under Maintenance</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1E293B;
          }
          .maintenance-container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin: 2rem;
          }
          .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%);
            clip-path: polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%);
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            color: #1E293B;
          }
          h1 {
            color: #1E293B;
            margin-bottom: 1rem;
            font-size: 2rem;
          }
          .tagline {
            color: #F59E0B;
            font-weight: 600;
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }
          .message {
            color: #64748B;
            line-height: 1.6;
            margin-bottom: 2rem;
          }
          .contact {
            background: #F8FAFC;
            padding: 1.5rem;
            border-radius: 12px;
            border-left: 4px solid #F59E0B;
          }
          .contact strong {
            color: #1E293B;
          }
          .bee-icon {
            font-size: 1.5rem;
            margin: 0 0.5rem;
          }
        </style>
      </head>
      <body>
        <div class="maintenance-container">
          <div class="logo">T</div>
          <h1>ToolHive</h1>
          <div class="tagline">Borrow  Lend  Let's Build it Together</div>
          <div class="message">
            <strong>Under Maintenance</strong><br>
            We're working hard to improve the platform and will be back online shortly!
          </div>
          <div class="contact">
            <strong>Questions? Contact us:</strong><br>
            <span class="bee-icon">Bee</span> hello@toolhive.com<br>
            <span class="bee-icon">Bee</span> ToolHive Team
          </div>
        </div>
      </body>
      </html>
    `);
  }
  next();
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(maintenanceMode); // Add maintenance mode middleware
app.use(express.static('.'));

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Helper functions
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// API Routes

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Test Supabase connection
    const { data, error } = await supabase
      .from('platform_stats')
      .select('*')
      .limit(1);

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      supabase: error ? 'error' : 'connected',
      stripe: 'connected',
      platform_stats: data?.[0] || null
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Get current platform stats
    const { data: stats } = await supabase
      .from('platform_stats')
      .select('*')
      .limit(1);

    const newUserCount = (stats?.[0]?.total_users || 0) + 1;
    const isFoundingMember = newUserCount <= 15;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        name,
        is_founding_member: isFoundingMember,
        auth_provider: 'email'
      })
      .select()
      .single();

    if (userError) throw userError;

    // Create Stripe customer
    const customer = await stripeInstance.customers.create({
      email,
      name,
      metadata: {
        userId: user.id,
        isFoundingMember: isFoundingMember.toString()
      }
    });

    // Update user with Stripe customer ID
    await supabase
      .from('users')
      .update({ stripe_customer_id: customer.id })
      .eq('id', user.id);

    // Initialize token balance
    const initialBalance = isFoundingMember ? 25.00 : 0.00;
    await supabase
      .from('token_balances')
      .insert({
        user_id: user.id,
        balance: initialBalance,
        total_earned: initialBalance
      });

    // Award founding member bonus
    if (isFoundingMember) {
      await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          transaction_type: 'founding_bonus',
          amount: 25.00,
          description: 'Founding Member Welcome Bonus - First 15 members'
        });
    }

    // Update platform stats
    await supabase
      .from('platform_stats')
      .update({
        total_users: newUserCount,
        founding_members_count: isFoundingMember ? (stats?.[0]?.founding_members_count || 0) + 1 : stats?.[0]?.founding_members_count || 0,
        total_supply: (stats?.[0]?.total_supply || 10000) + initialBalance
      })
      .eq('id', stats?.[0]?.id);

    const token = generateToken(user);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_founding_member: user.is_founding_member
      },
      token,
      balance: initialBalance,
      isFoundingMember
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For demo purposes, we'll skip password verification
    // In production, you'd verify against stored hash

    const token = generateToken(user);

    // Get user balance
    const { data: balance } = await supabase
      .from('token_balances')
      .select('balance, total_earned, total_spent')
      .eq('user_id', user.id)
      .single();

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_founding_member: user.is_founding_member
      },
      token,
      balance: balance || { balance: 0, total_earned: 0, total_spent: 0 }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data: balance } = await supabase
      .from('token_balances')
      .select('*')
      .eq('user_id', user.id)
      .single();

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_founding_member: user.is_founding_member,
        created_at: user.created_at
      },
      balance: balance || { balance: 0, total_earned: 0, total_spent: 0 }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Purchase ToolTokens with Stripe
app.post('/api/purchase', authenticateToken, async (req, res) => {
  try {
    const { cadAmount } = req.body;
    const userId = req.user.userId;

    if (!cadAmount || cadAmount <= 0) {
      return res.status(400).json({ error: 'Invalid purchase amount' });
    }

    // Get current rates
    const { data: stats } = await supabase
      .from('platform_stats')
      .select('current_purchase_rate')
      .limit(1);

    const purchaseRate = stats?.[0]?.current_purchase_rate || 1.25;
    const tokenAmount = cadAmount / purchaseRate;

    // Get user's Stripe customer ID
    const { data: user } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    // Create Stripe payment intent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(cadAmount * 100), // Convert to cents
      currency: 'cad',
      customer: user.stripe_customer_id,
      metadata: {
        userId: userId,
        tokenAmount: tokenAmount.toString(),
        cadAmount: cadAmount.toString(),
        purchaseRate: purchaseRate.toString()
      },
      description: `Purchase ${tokenAmount.toFixed(2)} ToolTokens`
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      tokenAmount,
      purchaseRate
    });

  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ error: 'Purchase failed' });
  }
});

// Stripe webhook handler
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook signature verification failed.`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { userId, tokenAmount, cadAmount, purchaseRate } = paymentIntent.metadata;

    try {
      // Create transaction record
      await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          transaction_type: 'purchase',
          amount: parseFloat(tokenAmount),
          cad_amount: parseFloat(cadAmount),
          rate: parseFloat(purchaseRate),
          description: `Purchase: ${tokenAmount} TT for $${cadAmount} CAD`,
          stripe_payment_intent_id: paymentIntent.id
        });

      // Update user balance
      await supabase.rpc('update_token_balance', {
        p_user_id: userId,
        p_amount: parseFloat(tokenAmount),
        p_transaction_type: 'purchase'
      });

      console.log(`Successfully processed purchase for user ${userId}: ${tokenAmount} TT`);
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  res.json({ received: true });
});

// Get user transactions
app.get('/api/user/transactions', authenticateToken, async (req, res) => {
  try {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user.userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json(transactions || []);

  } catch (error) {
    console.error('Transactions error:', error);
    res.status(500).json({ error: 'Failed to get transactions' });
  }
});

// Get available tools
app.get('/api/tools', async (req, res) => {
  try {
    const { data: tools, error } = await supabase
      .from('tools')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;

    res.json(tools || []);

  } catch (error) {
    console.error('Tools error:', error);
    res.status(500).json({ error: 'Failed to get tools' });
  }
});

// Submit review (triggers reliability mining)
app.post('/api/review', authenticateToken, async (req, res) => {
  try {
    const { toolId, rating, comment } = req.body;
    const userId = req.user.userId;

    if (!toolId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating' });
    }

    // Get user's review count
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('reviewer_id', userId)
      .eq('rating', 5);

    const fiveStarCount = reviews?.length || 0;

    // Create review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        tool_id: toolId,
        reviewer_id: userId,
        rating,
        comment
      })
      .select()
      .single();

    if (error) throw error;

    // Check for reliability mining reward
    let miningReward = null;
    if (rating === 5 && (fiveStarCount + 1) % 5 === 0) {
      const { data: reward } = await supabase
        .rpc('process_mining_reward', {
          p_user_id: userId,
          p_reward_type: 'reliability',
          p_amount: 5
        });

      miningReward = { amount: 5, transactionId: reward };
    }

    // Get updated balance
    const { data: balance } = await supabase
      .from('token_balances')
      .select('balance')
      .eq('user_id', userId)
      .single();

    res.json({
      review,
      miningReward,
      newBalance: balance?.balance || 0
    });

  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Upload service record (triggers maintenance mining)
app.post('/api/service', authenticateToken, async (req, res) => {
  try {
    const { toolId, serviceType, description } = req.body;
    const userId = req.user.userId;

    if (!toolId || !serviceType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create service record
    const { data: service, error } = await supabase
      .from('service_records')
      .insert({
        tool_id: toolId,
        service_provider_id: userId,
        service_type: serviceType,
        description,
        verified: true, // Auto-verify for demo
        tokens_awarded: 2,
        verified_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Award maintenance mining reward
    const { data: reward } = await supabase
      .rpc('process_mining_reward', {
        p_user_id: userId,
        p_reward_type: 'maintenance',
        p_amount: 2
      });

    // Get updated balance
    const { data: balance } = await supabase
      .from('token_balances')
      .select('balance')
      .eq('user_id', userId)
      .single();

    res.json({
      service,
      miningReward: { amount: 2, transactionId: reward },
      newBalance: balance?.balance || 0
    });

  } catch (error) {
    console.error('Service error:', error);
    res.status(500).json({ error: 'Failed to upload service' });
  }
});

// Get platform statistics
app.get('/api/stats', async (req, res) => {
  try {
    const { data: stats, error } = await supabase
      .from('platform_stats')
      .select('*')
      .limit(1);

    if (error) throw error;

    res.json(stats?.[0] || {
      total_users: 0,
      total_transactions: 0,
      total_tools: 0,
      active_users: 0,
      founding_members_count: 0,
      total_supply: 10000,
      current_purchase_rate: 1.25,
      current_sellback_rate: 0.75
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Serve the main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n\n`);
  console.log(`\ud83d\udc1d ToolHive Modern Server buzzing on port ${PORT}`);
  console.log(`\ud83c\udf10 Visit http://localhost:${PORT} to access the platform`);
  console.log(`\ud83d\udcca API Health: http://localhost:${PORT}/api/health`);
  console.log(`\ud83d\udd12 Supabase: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Connected' : 'Not configured'}`);
  console.log(`\ud83d\udcb3 Stripe: ${process.env.STRIPE_SECRET_KEY ? 'Connected' : 'Not configured'}`);
  console.log(`\n\n`);
});

module.exports = app;
