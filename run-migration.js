#!/usr/bin/env node

// Migration runner for ToolHive database
// Usage: node run-migration.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function runMigration() {
  console.log(' Starting ToolHive database migration...');
  
  // Read environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error(' Missing required environment variables:');
    console.error('  - NEXT_PUBLIC_SUPABASE_URL');
    console.error('  - SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  
  // Create Supabase client with service role key
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Read migration file
    const fs = require('fs');
    const path = require('path');
    const migrationPath = path.join(__dirname, 'migrations', 'fixed_profiles_migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log(' Migration file loaded successfully');
    
    // Execute migration
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error(' Migration failed:', error);
      process.exit(1);
    }
    
    console.log(' Migration completed successfully!');
    console.log(' Added columns to users table:');
    console.log('  - tool_token_balance (INTEGER)');
    console.log('  - is_member (BOOLEAN)');
    console.log('  - membership_tier (VARCHAR)');
    console.log('  - member_since (TIMESTAMP)');
    
    // Verify the migration
    console.log(' Verifying migration...');
    const { data: users, error: verifyError } = await supabase
      .from('users')
      .select('id, email, tool_token_balance, is_member, membership_tier, member_since')
      .limit(3);
    
    if (verifyError) {
      console.error(' Verification failed:', verifyError);
    } else {
      console.log(' Migration verified. Sample user data:');
      console.log(JSON.stringify(users, null, 2));
    }
    
  } catch (error) {
    console.error(' Migration error:', error);
    process.exit(1);
  }
}

// Alternative method using direct SQL execution
async function runMigrationDirect() {
  console.log(' Running migration with direct SQL execution...');
  
  const { createClient } = require('@supabase/supabase-js');
  require('dotenv').config();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error(' Missing environment variables');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Test connection
    const { data, error } = await supabase.from('users').select('count').single();
    if (error) throw error;
    
    console.log(' Database connection successful');
    console.log(' Please run the migration manually in Supabase dashboard:');
    console.log('  1. Go to your Supabase project');
    console.log('  2. Open SQL Editor');
    console.log('  3. Copy and paste the contents of: migrations/fixed_profiles_migration.sql');
    console.log('  4. Run the script');
    
  } catch (error) {
    console.error(' Database connection failed:', error);
  }
}

// Run the migration
if (require.main === module) {
  runMigrationDirect();
}

module.exports = { runMigration, runMigrationDirect };
