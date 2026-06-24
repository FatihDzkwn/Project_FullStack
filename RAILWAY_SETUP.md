# RAILWAY DEPLOYMENT SETUP

## ✅ Step 1: Set Environment Variables in Railway Dashboard

1. Go to https://railway.app/dashboard
2. Click on "Project_FullStack" project
3. Click on "projectfullstack-production" service
4. Go to **Variables** tab (or Settings)
5. Set these environment variables:

```
MYSQL_URL = mysql://root:AARCsfXzm0IwbjCVm8hTUgEyttsYJD@eseau.proxy.rlwy.net:41891/railway
NODE_ENV = production
PORT = 3000
```

6. Click Deploy/Redeploy button

## ✅ Step 2: Verify Database Connection

1. Wait 2-3 minutes for Railway to redeploy
2. Open Railway Build Logs - should show:
   - "MYSQL_URL env: SET (...)" 
   - "✅ MySQL Config parsed successfully"
   - "✅ Berhasil terhubung ke database!"

3. Test API: https://projectfullstack-production-28be.up.railway.app/api/flights
   - Should return JSON array of flights, not "Cannot GET /"

## ✅ Step 3: If Still Error

Check Build Logs for:
- "DATABASE CONNECTION ERROR:" with detailed error message
- "Config Host:" and "Config Port:" values
- Make sure MYSQL_URL format is correct

## 🔐 Security Note

- .env file is in .gitignore - NEVER commit sensitive data to GitHub
- Railway environment variables are the source of truth in production
- Local development: .env file is used by dotenv
- Production: Railway Dashboard env variables override everything
