# Vercel Deployment Instructions (No Custom Domain Required)

## Deploy Now with Temporary Vercel URL

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Project
```bash
vercel --prod
```

This will give you a temporary URL like: `https://toolhive-platform-abc123.vercel.app`

### 4. Configure Environment Variables in Vercel Dashboard
Go to your Vercel project settings and add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `JWT_SECRET`

### 5. Test on Temporary URL
All functionality will work on the Vercel temporary URL.

## When Your New Domain is Ready

### 1. Add Custom Domain in Vercel
- Go to Vercel project settings
- Add your new domain
- Follow DNS instructions

### 2. Update Stripe Webhooks
- Add new domain webhook endpoint: `https://your-domain.com/api/stripe/webhook`
- Update webhook endpoint URL

### 3. Update Supabase CORS
- Add your new domain to Supabase CORS settings
- Remove old domain if needed

### 4. Update Environment Variables
- No changes needed if using relative URLs
- Update any hardcoded domain references

## Benefits of Deploying Now
- Test production functionality immediately
- Get user feedback early
- Stripe webhooks work with temporary URL
- Easy domain switch when ready
