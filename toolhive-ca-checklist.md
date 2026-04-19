# ToolHive.ca Launch Checklist

## Pre-Deployment Checklist

### Environment Variables
- [ ] Supabase URL and keys configured
- [ ] Stripe secret and publishable keys added
- [ ] JWT secret generated
- [ ] Platform domain set to toolhive.ca

### Domain Configuration
- [ ] toolhive.ca purchased and accessible
- [ ] DNS ready for Vercel CNAME
- [ ] SSL certificate will be auto-provisioned

### Cloud Services
- [ ] Supabase project ready
- [ ] Stripe account configured
- [ ] Vercel account connected

## Deployment Steps

### 1. Vercel Deployment
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 2. Domain Configuration
- [ ] Add toolhive.ca to Vercel project
- [ ] Configure DNS CNAME to cname.vercel-dns.com
- [ ] Wait for DNS propagation (5-60 minutes)

### 3. Stripe Configuration
- [ ] Set webhook endpoint: https://toolhive.ca/api/stripe/webhook
- [ ] Test webhook with Stripe CLI
- [ ] Add webhook secret to environment variables

### 4. Supabase Configuration
- [ ] Add https://toolhive.ca to CORS settings
- [ ] Update site URL to https://toolhive.ca
- [ ] Run database schema if not done

## Post-Deployment Testing

### Health Checks
- [ ] https://toolhive.ca loads correctly
- [ ] https://toolhive.ca/api/health returns success
- [ ] SSL certificate active
- [ ] Mobile responsive

### Functionality Testing
- [ ] User registration works
- [ ] Login/logout functions
- [ ] Token purchase with Stripe
- [ ] Mining rewards trigger
- [ ] Tool discovery works
- [ ] Founding member bonus (first 15 users)

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] Mobile performance acceptable
- [ ] No console errors

## Security Verification

### SSL & HTTPS
- [ ] HTTPS redirects work
- [ ] SSL certificate valid
- [ ] No mixed content warnings

### API Security
- [ ] Environment variables not exposed
- [ ] CORS policies working
- [ ] Rate limiting active
- [ ] Input validation working

## Launch Ready

### Final Checklist
- [ ] All tests passing
- [ ] Monitoring configured
- [ ] Backup procedures documented
- [ ] Support contacts ready
- [ ] Legal pages accessible

### Go Live
- [ ] DNS fully propagated
- [ ] All services operational
- [ ] Error monitoring active
- [ ] User onboarding smooth

## Emergency Contacts

- **Technical Support**: hello@toolhive.com
- **Payment Issues**: hello@toolhive.com
- **User Support**: hello@toolhive.com

---

**Status**: Ready for deployment when you give the go-ahead!
