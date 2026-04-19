# ToolHive.ca Deployment Plan

## Domain Configuration
**Primary Domain**: `toolhive.ca`
**SSL Certificate**: Auto-provisioned by Vercel
**CDN**: Vercel Edge Network

## Step 1: Configure Environment Variables

Update your `.env` file with actual credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application Configuration
NODE_ENV=production
PORT=3000
JWT_SECRET=your_jwt_secret_key

# ToolHive Configuration
PLATFORM_NAME=ToolHive
PLATFORM_EMAIL=hello@toolhive.com
FOUNDING_MEMBER_BONUS=25
TOKEN_PURCHASE_RATE=1.25
TOKEN_SELLBACK_RATE=0.75
```

## Step 2: Deploy to Vercel

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login and Deploy
```bash
vercel login
vercel --prod
```

### Add Custom Domain in Vercel
1. Go to Vercel project settings
2. Add `toolhive.ca`
3. Follow DNS instructions (usually just CNAME to cname.vercel-dns.com)

## Step 3: Configure Stripe

### Update Webhook Endpoint
- **Endpoint URL**: `https://toolhive.ca/api/stripe/webhook`
- **Events**: `payment_intent.succeeded`, `payment_intent.payment_failed`
- **Secret**: Copy webhook secret to environment variables

### Update Allowed Domains
In Stripe Dashboard > Settings > Webhooks, ensure `toolhive.ca` is allowed.

## Step 4: Configure Supabase

### Update CORS Settings
In Supabase Dashboard > Settings > API, add:
- `https://toolhive.ca`
- `https://www.toolhive.ca`

### Update Site URL
Set Site URL to `https://toolhive.ca` in Supabase settings.

## Step 5: DNS Configuration

### Required DNS Records
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Optional: Email DNS
```
Type: MX
Name: @
Value: mx1.zoho.com (priority 10)

Type: TXT
Name: @
Value: "v=spf1 include:zoho.com ~all"
```

## Step 6: Production Testing

### Health Check
```bash
curl https://toolhive.ca/api/health
```

### Test Features
- [ ] User registration/login
- [ ] Token purchase with Stripe
- [ ] Mining rewards
- [ ] Tool discovery
- [ ] Mobile responsiveness

## Step 7: Security & Performance

### SSL Certificate
- Auto-provisioned by Vercel
- Force HTTPS redirect
- HSTS headers enabled

### Performance Optimization
- Vercel Edge CDN
- Image optimization
- API response caching
- Database indexing

### Security Headers
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

## Step 8: Monitoring & Analytics

### Vercel Analytics
- Page views and performance
- API response times
- Error tracking

### Custom Monitoring
- User registration metrics
- Token transaction volume
- Mining reward distribution

## Step 9: Launch Checklist

### Pre-Launch
- [ ] All environment variables configured
- [ ] DNS records propagated
- [ ] SSL certificate active
- [ ] Stripe webhooks tested
- [ ] Supabase CORS updated

### Post-Launch
- [ ] Monitor error logs
- [ ] Check payment processing
- [ ] Verify user registrations
- [ ] Test mobile experience
- [ ] Performance optimization

## Emergency Procedures

### Rollback Plan
- Previous version available in Vercel
- Database backups in Supabase
- Stripe payment monitoring

### Support Contacts
- **Technical**: hello@toolhive.com
- **Billing**: hello@toolhive.com
- **Emergency**: hello@toolhive.com

## Timeline Estimate

- **Environment Setup**: 30 minutes
- **Vercel Deployment**: 15 minutes
- **DNS Propagation**: 5-60 minutes
- **Stripe Configuration**: 30 minutes
- **Supabase Settings**: 15 minutes
- **Testing**: 1 hour
- **Total**: ~3.5 hours

## Success Metrics

- **Performance**: < 2s load time
- **Uptime**: > 99.9%
- **Security**: No vulnerabilities
- **User Experience**: Smooth registration and payments
- **Mobile**: Fully responsive

---

**Ready to launch ToolHive.ca!**
