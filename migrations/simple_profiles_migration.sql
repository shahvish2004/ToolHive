-- Simple Migration: Add tool_token_balance and is_member columns
-- Created: 2026-04-17
-- Purpose: Add missing columns to profiles table (compatible with Supabase)

-- Step 1: Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  tool_token_balance INTEGER DEFAULT 0,
  is_member BOOLEAN DEFAULT FALSE,
  membership_tier VARCHAR(20) DEFAULT 'basic',
  member_since TIMESTAMP WITH TIME ZONE,
  is_founding_member BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Add columns if they don't exist (using ALTER TABLE IF NOT EXISTS syntax)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tool_token_balance INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_member BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_tier VARCHAR(20) DEFAULT 'basic';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS member_since TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_founding_member BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_tool_token_balance ON profiles(tool_token_balance);
CREATE INDEX IF NOT EXISTS idx_profiles_is_member ON profiles(is_member);
CREATE INDEX IF NOT EXISTS idx_profiles_membership_tier ON profiles(membership_tier);

-- Step 4: Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile info" ON profiles;
CREATE POLICY "Users can update own profile info" ON profiles FOR UPDATE USING (
  auth.uid() = id AND 
  (tool_token_balance IS NOT DISTINCT FROM OLD.tool_token_balance)
);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Step 6: Create functions
CREATE OR REPLACE FUNCTION update_user_token_balance(
  p_user_id UUID,
  p_new_balance INTEGER
) RETURNS BOOLEAN AS $$
BEGIN
  UPDATE profiles SET tool_token_balance = p_new_balance WHERE id = p_user_id;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION activate_user_membership(
  p_user_id UUID,
  p_tier VARCHAR DEFAULT 'basic'
) RETURNS BOOLEAN AS $$
BEGIN
  UPDATE profiles 
  SET 
    is_member = TRUE,
    membership_tier = p_tier,
    member_since = NOW()
  WHERE id = p_user_id AND is_member = FALSE;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 7: Grant permissions
GRANT EXECUTE ON FUNCTION update_user_token_balance TO authenticated;
GRANT EXECUTE ON FUNCTION activate_user_membership TO authenticated;

-- Step 8: Add comments
COMMENT ON TABLE profiles IS 'User profiles linked to Supabase auth.users';
COMMENT ON COLUMN profiles.tool_token_balance IS 'Current ToolToken balance for the user (integer tokens)';
COMMENT ON COLUMN profiles.is_member IS 'Whether user has active ToolHive membership';
COMMENT ON COLUMN profiles.membership_tier IS 'Membership tier: basic, pro, or premium';
COMMENT ON COLUMN profiles.member_since IS 'Date when user became a member';

-- Step 9: Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 10: Sync existing users
INSERT INTO profiles (id, email, name, tool_token_balance, is_member)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', 'User'),
  0,
  FALSE
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles);
