# Environment Variables Setup for ToolHive.ca

## Step 1: Go to Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Go to your ToolHive project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

## Step 2: Add Each Environment Variable

### Supabase Configuration
1. Click **Add Variable**
2. **Name**: `NEXT_PUBLIC_SUPABASE_URL`
3. **Value**: `https://your-project.supabase.co` (replace with your actual Supabase URL)
4. **Environments**: Production, Preview, Development
5. Click **Save**

6. Click **Add Variable**
7. **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
8. **Value**: `your_supabase_anon_key` (replace with your actual anon key)
9. **Environments**: Production, Preview, Development
10. Click **Save**

11. Click **Add Variable**
12. **Name**: `SUPABASE_SERVICE_ROLE_KEY`
13. **Value**: `your_supabase_service_role_key` (replace with your actual service role key)
14. **Environments**: Production, Preview, Development
15. Click **Save**

### Stripe Configuration
16. Click **Add Variable**
17. **Name**: `STRIPE_SECRET_KEY`
18. **Value**: `sk_test_your_stripe_secret_key` (replace with your actual Stripe secret key)
19. **Environments**: Production, Preview, Development
20. Click **Save**

21. Click **Add Variable**
22. **Name**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
23. **Value**: `pk_test_your_stripe_publishable_key` (replace with your actual Stripe publishable key)
24. **Environments**: Production, Preview, Development
25. Click **Save**

26. Click **Add Variable**
27. **Name**: `STRIPE_WEBHOOK_SECRET`
28. **Value**: `whsec_your_webhook_secret` (replace with your actual webhook secret)
29. **Environments**: Production, Preview, Development
30. Click **Save**

### Application Configuration
31. Click **Add Variable**
32. **Name**: `JWT_SECRET`
33. **Value**: `your_jwt_secret_key` (generate a secure random string)
34. **Environments**: Production, Preview, Development
35. Click **Save**

36. Click **Add Variable**
37. **Name**: `NODE_ENV`
38. **Value**: `production`
39. **Environments**: Production
40. Click **Save**

41. Click **Add Variable**
42. **Name**: `PLATFORM_NAME`
43. **Value**: `ToolHive`
44. **Environments**: Production, Preview, Development
45. Click **Save**

46. Click **Add Variable**
47. **Name**: `PLATFORM_EMAIL`
48. **Value**: `hello@toolhive.com`
49. **Environments**: Production, Preview, Development
50. Click **Save`

## Step 3: Where to Find Your Credentials

### Supabase
1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Go to **Settings** > **API**
4. Copy:
   - **Project URL** (for NEXT_PUBLIC_SUPABASE_URL)
   - **Anon public** key (for NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - **Service role** key (for SUPABASE_SERVICE_ROLE_KEY)

### Stripe
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to **Developers** > **API keys**
3. Copy:
   - **Secret key** (for STRIPE_SECRET_KEY)
   - **Publishable key** (for NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
4. For webhook secret:
   - Go to **Developers** > **Webhooks**
   - Click your webhook endpoint
   - Copy the **Signing secret**

### JWT Secret
Generate a secure random string:
```bash
# Option 1: Use online generator
# Visit: https://www.uuidgenerator.net/

# Option 2: Generate with Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 3: Use OpenSSL
openssl rand -hex 64
```

## Step 4: Redeploy After Adding Variables

Once all environment variables are added:

1. Go to **Deployments** tab in Vercel
2. Click **...** (three dots) next to latest deployment
3. Click **Redeploy**
4. Or run: `vercel --prod`

## Step 5: Verify Environment Variables

After redeployment, test that environment variables are working:

1. Visit: `https://toolhive.ca/api/health`
2. Should return:
```json
{
  "status": "healthy",
  "timestamp": "2026-04-17T...",
  "supabase": "connected",
  "stripe": "connected"
}
```

## Common Issues & Solutions

### Issue: API returns "supabase: error"
**Solution**: Check Supabase URL and keys are correct

### Issue: Stripe integration not working
**Solution**: Verify Stripe keys are correct and webhook endpoint is set

### Issue: JWT authentication failing
**Solution**: Ensure JWT_SECRET is set and consistent

### Issue: Environment variables not updating
**Solution**: Redeploy the project after adding variables

## Quick Reference List

Copy and paste these variable names:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
JWT_SECRET
NODE_ENV
PLATFORM_NAME
PLATFORM_EMAIL
```

---

**After setting up environment variables, your ToolHive platform will be fully functional!**
