-- Migration: Create profiles table with tool_token_balance and is_member columns
-- Created: 2026-04-17
-- Purpose: Create user profiles table linked to Supabase auth.users

-- Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  tool_token_balance INTEGER DEFAULT 0,
  is_member BOOLEAN DEFAULT FALSE,
  membership_tier VARCHAR(20) DEFAULT 'basic' CHECK (membership_tier IN ('basic', 'pro', 'premium')),
  member_since TIMESTAMP WITH TIME ZONE,
  is_founding_member BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_tool_token_balance ON profiles(tool_token_balance);
CREATE INDEX IF NOT EXISTS idx_profiles_is_member ON profiles(is_member);
CREATE INDEX IF NOT EXISTS idx_profiles_membership_tier ON profiles(membership_tier);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles 
FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (but not token balance directly)
CREATE POLICY "Users can update own profile info" ON profiles 
FOR UPDATE USING (
  auth.uid() = id AND 
  (tool_token_balance IS NOT DISTINCT FROM OLD.tool_token_balance)
);

-- Users can insert their own profile (for initial setup)
CREATE POLICY "Users can insert own profile" ON profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to safely update token balance
CREATE OR REPLACE FUNCTION update_user_token_balance(
  p_user_id UUID,
  p_new_balance INTEGER
) RETURNS BOOLEAN AS $$
BEGIN
  -- Update user's token balance
  UPDATE profiles 
  SET tool_token_balance = p_new_balance
  WHERE id = p_user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to activate membership
CREATE OR REPLACE FUNCTION activate_user_membership(
  p_user_id UUID,
  p_tier VARCHAR DEFAULT 'basic'
) RETURNS BOOLEAN AS $$
BEGIN
  -- Update user membership status
  UPDATE profiles 
  SET 
    is_member = TRUE,
    membership_tier = p_tier,
    member_since = NOW()
  WHERE id = p_user_id AND is_member = FALSE;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create profile from auth user
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION update_user_token_balance TO authenticated;
GRANT EXECUTE ON FUNCTION activate_user_membership TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE profiles IS 'User profiles linked to Supabase auth.users';
COMMENT ON COLUMN profiles.tool_token_balance IS 'Current ToolToken balance for the user (integer tokens)';
COMMENT ON COLUMN profiles.is_member IS 'Whether user has active ToolHive membership';
COMMENT ON COLUMN profiles.membership_tier IS 'Membership tier: basic, pro, or premium';
COMMENT ON COLUMN profiles.member_since IS 'Date when user became a member';

-- Existing users migration (if any)
INSERT INTO profiles (id, email, name, is_member, membership_tier, member_since, tool_token_balance)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', 'User'),
  FALSE,
  'basic',
  NULL,
  0
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles);
