-- Migration: Add tool_token_balance and is_member columns to existing profiles table
-- Created: 2026-04-17
-- Purpose: Safely add missing columns to profiles table

-- Check if profiles table exists and add missing columns
DO $$
BEGIN
    -- Check if profiles table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles' AND table_schema = 'current_schema()') THEN
        RAISE NOTICE 'Profiles table exists, checking columns...';
        
        -- Add tool_token_balance column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'tool_token_balance'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN tool_token_balance INTEGER DEFAULT 0;
            RAISE NOTICE 'Added tool_token_balance column';
        END IF;
        
        -- Add is_member column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'is_member'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN is_member BOOLEAN DEFAULT FALSE;
            RAISE NOTICE 'Added is_member column';
        END IF;
        
        -- Add membership_tier column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'membership_tier'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN membership_tier VARCHAR(20) DEFAULT 'basic';
            RAISE NOTICE 'Added membership_tier column';
        END IF;
        
        -- Add member_since column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'member_since'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN member_since TIMESTAMP WITH TIME ZONE;
            RAISE NOTICE 'Added member_since column';
        END IF;
        
        -- Add is_founding_member column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'is_founding_member'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN is_founding_member BOOLEAN DEFAULT FALSE;
            RAISE NOTICE 'Added is_founding_member column';
        END IF;
        
        -- Add stripe_customer_id column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'stripe_customer_id'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN stripe_customer_id VARCHAR(255);
            RAISE NOTICE 'Added stripe_customer_id column';
        END IF;
        
        -- Add created_at column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'created_at'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
            RAISE NOTICE 'Added created_at column';
        END IF;
        
        -- Add updated_at column if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'updated_at'
            AND table_schema = 'current_schema()'
        ) THEN
            ALTER TABLE profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
            RAISE NOTICE 'Added updated_at column';
        END IF;
        
    ELSE
        RAISE NOTICE 'Profiles table does not exist, creating it...';
        
        -- Create profiles table
        CREATE TABLE profiles (
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
        
        RAISE NOTICE 'Created profiles table';
    END IF;
END $$;

-- Create indexes if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'profiles' AND indexname = 'idx_profiles_email') THEN
        CREATE INDEX idx_profiles_email ON profiles(email);
        RAISE NOTICE 'Created idx_profiles_email';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'profiles' AND indexname = 'idx_profiles_tool_token_balance') THEN
        CREATE INDEX idx_profiles_tool_token_balance ON profiles(tool_token_balance);
        RAISE NOTICE 'Created idx_profiles_tool_token_balance';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'profiles' AND indexname = 'idx_profiles_is_member') THEN
        CREATE INDEX idx_profiles_is_member ON profiles(is_member);
        RAISE NOTICE 'Created idx_profiles_is_member';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename = 'profiles' AND indexname = 'idx_profiles_membership_tier') THEN
        CREATE INDEX idx_profiles_membership_tier ON profiles(membership_tier);
        RAISE NOTICE 'Created idx_profiles_membership_tier';
    END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
        CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
        RAISE NOTICE 'Created Users can view own profile policy';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile info') THEN
        CREATE POLICY "Users can update own profile info" ON profiles FOR UPDATE USING (
            auth.uid() = id AND 
            (tool_token_balance IS NOT DISTINCT FROM OLD.tool_token_balance)
        );
        RAISE NOTICE 'Created Users can update own profile info policy';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
        CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
        RAISE NOTICE 'Created Users can insert own profile policy';
    END IF;
END $$;

-- Create functions if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_user_token_balance') THEN
        CREATE OR REPLACE FUNCTION update_user_token_balance(
            p_user_id UUID,
            p_new_balance INTEGER
        ) RETURNS BOOLEAN AS $$
        BEGIN
            UPDATE profiles SET tool_token_balance = p_new_balance WHERE id = p_user_id;
            RETURN FOUND;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
        RAISE NOTICE 'Created update_user_token_balance function';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'activate_user_membership') THEN
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
        RAISE NOTICE 'Created activate_user_membership function';
    END IF;
END $$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION update_user_token_balance TO authenticated;
GRANT EXECUTE ON FUNCTION activate_user_membership TO authenticated;

-- Add comments
COMMENT ON TABLE profiles IS 'User profiles linked to Supabase auth.users';
COMMENT ON COLUMN profiles.tool_token_balance IS 'Current ToolToken balance for the user (integer tokens)';
COMMENT ON COLUMN profiles.is_member IS 'Whether user has active ToolHive membership';
COMMENT ON COLUMN profiles.membership_tier IS 'Membership tier: basic, pro, or premium';
COMMENT ON COLUMN profiles.member_since IS 'Date when user became a member';

-- Verification query
DO $$
BEGIN
    RAISE NOTICE 'Migration completed. Current profiles table structure:';
    PERFORM pg_sleep(1); -- Brief pause for visibility
END $$;
