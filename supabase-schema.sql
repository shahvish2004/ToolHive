-- ToolHive Supabase Database Schema
-- Created for integration with modern cloud services

-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_founding_member BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  stripe_customer_id VARCHAR(255),
  auth_provider VARCHAR(50) DEFAULT 'email'
);

-- ToolToken balances
CREATE TABLE token_balances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(15,2) DEFAULT 0.00,
  total_earned DECIMAL(15,2) DEFAULT 0.00,
  total_spent DECIMAL(15,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Transactions ledger
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL, -- 'purchase', 'sell', 'mining_reward', 'founding_bonus'
  amount DECIMAL(15,2) NOT NULL,
  cad_amount DECIMAL(15,2),
  rate DECIMAL(10,4),
  description TEXT,
  stripe_payment_intent_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  block_height INTEGER,
  transaction_hash VARCHAR(255)
);

-- Tools catalog
CREATE TABLE tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  available_count INTEGER DEFAULT 0,
  total_count INTEGER DEFAULT 0,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Tool rentals/borrowing
CREATE TABLE tool_rentals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  borrower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'cancelled'
  cost_tokens DECIMAL(10,2),
  deposit_tokens DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews and ratings
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rental_id UUID REFERENCES tool_rentals(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service records (for maintenance mining)
CREATE TABLE service_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  service_provider_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_type VARCHAR(100) NOT NULL,
  description TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES users(id),
  tokens_awarded DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Platform statistics
CREATE TABLE platform_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_users INTEGER DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  total_tools INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  founding_members_count INTEGER DEFAULT 0,
  total_supply DECIMAL(15,2) DEFAULT 0.00,
  current_purchase_rate DECIMAL(10,4) DEFAULT 1.25,
  current_sellback_rate DECIMAL(10,4) DEFAULT 0.75,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_token_balances_user_id ON token_balances(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_owner_id ON tools(owner_id);
CREATE INDEX idx_tool_rentals_borrower_id ON tool_rentals(borrower_id);
CREATE INDEX idx_tool_rentals_tool_id ON tool_rentals(tool_id);
CREATE INDEX idx_reviews_tool_id ON reviews(tool_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_service_records_provider_id ON service_records(service_provider_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- RLS (Row Level Security) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_records ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Token balances policies
CREATE POLICY "Users can view own balance" ON token_balances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own balance" ON token_balances FOR UPDATE USING (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);

-- Tool rentals policies
CREATE POLICY "Users can view own rentals" ON tool_rentals FOR SELECT USING (auth.uid() = borrower_id OR auth.uid() = lender_id);

-- Reviews policies
CREATE POLICY "Users can view own reviews" ON reviews FOR SELECT USING (auth.uid() = reviewer_id);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Service records policies
CREATE POLICY "Users can view own service records" ON service_records FOR SELECT USING (auth.uid() = service_provider_id);

-- Functions for token operations
CREATE OR REPLACE FUNCTION update_token_balance(
  p_user_id UUID,
  p_amount DECIMAL,
  p_transaction_type VARCHAR
) RETURNS VOID AS $$
BEGIN
  INSERT INTO token_balances (user_id, balance)
  VALUES (p_user_id, p_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    balance = token_balances.balance + p_amount,
    updated_at = NOW();
    
  -- Update platform stats
  UPDATE platform_stats 
  SET 
    total_supply = total_supply + p_amount,
    updated_at = NOW()
  WHERE id = (SELECT id FROM platform_stats LIMIT 1);
END;
$$ LANGUAGE plpgsql;

-- Function for mining rewards
CREATE OR REPLACE FUNCTION process_mining_reward(
  p_user_id UUID,
  p_reward_type VARCHAR,
  p_amount DECIMAL
) RETURNS UUID AS $$
DECLARE
  transaction_id UUID;
BEGIN
  -- Create transaction record
  INSERT INTO transactions (user_id, transaction_type, amount, description)
  VALUES (p_user_id, 'mining_reward', p_amount, 
          CASE p_reward_type 
            WHEN 'reliability' THEN 'Community Growth Bonus: Reliability Mining'
            WHEN 'maintenance' THEN 'Community Growth Bonus: Maintenance Mining'
            ELSE 'Community Growth Bonus'
          END)
  RETURNING id INTO transaction_id;
  
  -- Update balance
  PERFORM update_token_balance(p_user_id, p_amount, 'mining_reward');
  
  RETURN transaction_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_token_balances_updated_at BEFORE UPDATE ON token_balances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial platform stats
INSERT INTO platform_stats (total_users, total_transactions, total_tools, active_users, founding_members_count, total_supply)
VALUES (0, 0, 0, 0, 0, 10000.00);
