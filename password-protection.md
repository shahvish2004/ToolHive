# Password Protection for ToolHive.ca

## Method 1: Vercel Password Protection
1. Go to Vercel Dashboard
2. Select your ToolHive project
3. Go to Settings
4. Click "Password Protection"
5. Enable and set password
6. Only users with password can access

## Method 2: Basic Auth Middleware
Add this to server-modern.js before routes:

```javascript
// Basic Auth Middleware
const basicAuth = (req, res, next) => {
  const auth = { login: 'admin', password: 'your-password' };
  
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }
  
  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required');
};

app.use(basicAuth);
```

## Method 3: IP Whitelist
Restrict access to specific IP addresses only:

```javascript
const ipFilter = (req, res, next) => {
  const allowedIPs = ['YOUR_IP_ADDRESS'];
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (allowedIPs.includes(clientIP)) {
    return next();
  }
  
  res.status(403).send('Access denied');
};

app.use(ipFilter);
```

## Method 4: Maintenance Mode
Show maintenance page:

```javascript
const maintenanceMode = (req, res, next) => {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return res.send(`
      <html>
        <body>
          <h1>ToolHive.ca - Under Maintenance</h1>
          <p>We'll be back soon!</p>
        </body>
      </html>
    `);
  }
  next();
};

app.use(maintenanceMode);
```

## Method 5: Complete Unpublish
1. Go to Vercel project
2. Click "..." menu
3. Select "Pause Deployment"
4. Or delete the project entirely

## Environment Variables for Access Control
Add to Vercel environment variables:
- `MAINTENANCE_MODE=true`
- `BASIC_AUTH_USER=admin`
- `BASIC_AUTH_PASSWORD=your-password`
- `ALLOWED_IPS=your-ip-address`
