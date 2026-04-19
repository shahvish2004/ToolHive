# Maintenance Mode for ToolHive.ca

## How to Enable/Disable Maintenance Mode

### Option 1: Via Vercel Environment Variables (Recommended)

1. **Go to Vercel Dashboard**
   - Login to vercel.com
   - Select your ToolHive project
   - Go to **Settings** tab
   - Click **Environment Variables**

2. **Enable Maintenance Mode**
   - Add new environment variable:
     - **Name**: `MAINTENANCE_MODE`
     - **Value**: `true`
     - **Environments**: Production, Preview, Development
   - Click **Save**
   - **Redeploy** the project

3. **Disable Maintenance Mode**
   - Change the value to `false` or delete the variable
   - **Redeploy** the project

### Option 2: Via Local Development

1. **Enable Locally**
   ```bash
   # Add to .env file
   MAINTENANCE_MODE=true
   ```

2. **Disable Locally**
   ```bash
   # Remove or set to false in .env file
   MAINTENANCE_MODE=false
   ```

## What Users See

When maintenance mode is enabled, visitors to https://toolhive.ca will see:

- **Professional maintenance page** with ToolHive branding
- **Hexagonal logo** with gradient background
- **Contact information** (hello@toolhive.com)
- **No access** to platform features
- **Clean, modern design** matching your brand

## Features

- **Instant activation** after redeploy
- **Full platform restriction** - no features accessible
- **Professional appearance** - maintains brand image
- **Contact information** for user inquiries
- **Mobile responsive** design

## Best Practices

1. **Plan maintenance windows** in advance
2. **Communicate downtime** to users
3. **Set realistic expectations** for return time
4. **Monitor user inquiries** during maintenance
5. **Test thoroughly** before disabling maintenance mode

## Emergency Use

For emergency maintenance:
1. Set `MAINTENANCE_MODE=true`
2. Redeploy immediately
3. Platform becomes inaccessible instantly
4. Work on fixes safely
5. Set `MAINTENANCE_MODE=false` when ready

## Alternative: Quick Toggle

For frequent maintenance needs, you can also:
- Use Vercel's **Pause Deployment** feature
- Remove the custom domain temporarily
- Use Vercel's **Password Protection**

Maintenance mode provides the most professional appearance while restricting access.
