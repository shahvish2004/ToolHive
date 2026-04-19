# DNS Configuration Guide: toolhive.ca

## Step 1: GoDaddy DNS Settings

### 1.1 Log into GoDaddy
1. Go to [godaddy.com](https://godaddy.com)
2. Log into your account
3. Go to "My Products"
4. Find "toolhive.ca" and click "DNS"

### 1.2 Update DNS Records
You'll need to update these records:

#### Current Records to Delete/Modify:
- Any existing A records pointing to old hosting
- Any existing CNAME records
- Any MX records (if you want email)

#### New Records to Add:

**For the root domain (@):**
```
Type: CNAME
Name: @ (or "toolhive")
Value: cname.vercel-dns.com
TTL: 1 Hour (or default)
```

**For the www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 Hour (or default)
```

**Optional - Email Setup (if you want email@toolhive.ca):**
```
Type: MX
Name: @
Value: mx1.zoho.com
Priority: 10

Type: TXT
Name: @
Value: "v=spf1 include:zoho.com ~all"
```

### 1.3 Save Changes
1. Click "Save Changes"
2. Wait for DNS propagation (5 minutes to 48 hours, usually 1-2 hours)

## Step 2: Vercel Domain Configuration

### 2.1 Add Custom Domain in Vercel
1. Go to [vercel.com](https://vercel.com)
2. Go to your ToolHive project
3. Click "Settings" tab
4. Click "Domains" in the left sidebar
5. Click "Add" button
6. Enter: `toolhive.ca`
7. Click "Add"

### 2.2 Verify DNS Configuration
Vercel will show:
- **DNS Status**: "Configured" (green checkmark) when DNS is working
- **DNS Status**: "Pending" (yellow) while DNS is propagating
- **DNS Status**: "Invalid" (red) if there's an issue

### 2.3 Add WWW Domain (Optional)
1. Click "Add" again
2. Enter: `www.toolhive.ca`
3. Vercel will automatically redirect www to non-www

## Step 3: Troubleshooting Common Issues

### 3.1 DNS Not Propagating
**Check DNS status:**
```bash
nslookup toolhive.ca
```
or use [dnschecker.org](https://dnschecker.org)

**Common fixes:**
- Wait longer (up to 48 hours)
- Clear your browser cache
- Try incognito mode
- Check GoDaddy DNS settings again

### 3.2 CNAME Record Issues
**Make sure:**
- The CNAME value is exactly: `cname.vercel-dns.com`
- No trailing spaces
- No extra periods
- TTL is set to reasonable value (1 hour or default)

### 3.3 Vercel Shows "Invalid DNS"
**Check:**
- DNS records in GoDaddy match exactly
- No conflicting A records
- Domain is unlocked in GoDaddy
- Domain hasn't expired

## Step 4: SSL Certificate

### 4.1 Automatic SSL
- Vercel automatically provisions SSL certificates
- This happens after DNS is verified
- Usually takes 5-30 minutes

### 4.2 Check SSL Status
1. In Vercel dashboard, look for green lock icon
2. Visit `https://toolhive.ca` - should show secure connection
3. Check SSL certificate details in browser

## Step 5: Final Verification

### 5.1 Test the Domain
1. Visit `https://toolhive.ca`
2. Should load your ToolHive platform
3. Check SSL certificate (green lock)
4. Test mobile responsiveness

### 5.2 Test Subdomains
1. Visit `https://www.toolhive.ca`
2. Should redirect to `https://toolhive.ca`

### 5.3 API Endpoints
1. Test: `https://toolhive.ca/api/health`
2. Should return JSON response

## Step 6: Environment Variables

### 6.1 Add in Vercel Dashboard
1. Go to Vercel project > Settings > Environment Variables
2. Add these variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

### 6.2 Redeploy
After adding environment variables:
1. Go to Vercel project
2. Click "Deployments"
3. Click "..." next to latest deployment
4. Click "Redeploy"

## Quick Reference

### GoDaddy DNS Records:
```
@    CNAME    cname.vercel-dns.com
www  CNAME    cname.vercel-dns.com
```

### Vercel Steps:
1. Add domain: `toolhive.ca`
2. Wait for DNS verification
3. Add environment variables
4. Redeploy

### Timeline:
- DNS changes: 5 minutes - 48 hours
- SSL certificate: 5-30 minutes after DNS
- Full deployment: 1-2 hours typical

---

**Need help? Check the Vercel dashboard for real-time DNS status!**
