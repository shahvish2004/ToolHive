-- Migration: Add tool_token_balance and is_member columns to users table
-- Created: 2026-04-17
-- Purpose: Add missing profile columns for ToolHive platform functionality

-- Add tool_token_balance column (integer for whole tokens)
ALTER TABLE users 
ADD COLUMN tool_token_balance INTEGER DEFAULT 0;

-- Add is_member column (boolean for membership status)
ALTER TABLE users 
ADD COLUMN is_member BOOLEAN DEFAULT FALSE;

-- Add membership tier for future use
ALTER TABLE users 
ADD COLUMN membership_tier VARCHAR(20) DEFAULT 'basic' CHECK (membership_tier IN ('basic', 'pro', 'premium'));

-- Add membership date for tracking
ALTER TABLE users 
ADD COLUMN member_since TIMESTAMP WITH TIME ZONE;

-- Update existing users to have basic membership if they were founding members
UPDATE users 
SET 
    is_member = TRUE,
    membership_tier = 'premium',
    member_since = created_at,
    tool_token_balance = CASE 
        WHEN is_founding_member = TRUE THEN 25 
        ELSE 0 
    END
WHERE is_founding_member = TRUE;

-- Create index for performance on new columns
CREATE INDEX idx_users_tool_token_balance ON users(tool_token_balance);
CREATE INDEX idx_users_is_member ON users(is_member);
CREATE INDEX idx_users_membership_tier ON users(membership_tier);

-- Update RLS policies to include new columns
-- Users can view their own profile including new columns
CREATE POLICY "Users can view own profile with tokens" ON users 
FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (but not token balance directly)
CREATE POLICY "Users can update own profile info" ON users 
FOR UPDATE USING (
    auth.uid() = id AND 
    -- Prevent direct token balance updates through profile
    (tool_token_balance IS NOT DISTINCT FROM OLD.tool_token_balance)
);

-- Function to safely update token balance (for use by API)
CREATE OR REPLACE FUNCTION update_user_token_balance(
    p_user_id UUID,
    p_new_balance INTEGER
) RETURNS BOOLEAN AS $$
BEGIN
    -- Update user's token balance
    UPDATE users 
    SET tool_token_balance = p_new_balance
    WHERE id = p_user_id;
    
    -- Also update token_balances table for consistency
    INSERT INTO token_balances (user_id, balance)
    VALUES (p_user_id, p_new_balance::DECIMAL)
    ON CONFLICT (user_id)
    DO UPDATE SET 
        balance = p_new_balance::DECIMAL,
        updated_at = NOW();
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to activate membership
CREATE OR REPLACE FUNCTION activate_user_membership(
    p_user_id UUID,
    p_tier VARCHAR DEFAULT 'basic'
) RETURNS BOOLEAN AS $$
BEGIN
    -- Update user membership status
    UPDATE users 
    SET 
        is_member = TRUE,
        membership_tier = p_tier,
        member_since = NOW()
    WHERE id = p_user_id AND is_member = FALSE;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION update_user_token_balance TO authenticated;
GRANT EXECUTE ON FUNCTION activate_user_membership TO authenticated;

-- Add comment for documentation
COMMENT ON COLUMN users.tool_token_balance IS 'Current ToolToken balance for the user (integer tokens)';
COMMENT ON COLUMN users.is_member IS 'Whether user has active ToolHive membership';
COMMENT ON COLUMN users.membership_tier IS 'Membership tier: basic, pro, or premium';
COMMENT ON COLUMN users.member_since IS 'Date when user became a member';

-- Verification query (uncomment to test)
-- SELECT id, email, tool_token_balance, is_member, membership_tier, member_since 
-- FROM users 
-- LIMIT 5;
