# 🚨 CRITICAL: Set Railway Environment Variables

## Masalah Saat Ini
- Log masih menunjukkan: "Injected env (0)" = NO environment variables
- Server loading dari .env file lama, bukan dari Railway config
- MYSQL_URL tidak tersedia untuk backend

## ✅ SOLUSI: Set Variables di Railway Dashboard

### Step 1: Go to Railway Dashboard
```
https://railway.app/dashboard
```

### Step 2: Select Project & Service
1. Click on "skybooking" project
2. Select "production" service  
3. Click on service name to open it

### Step 3: Go to Variables Tab
- Look for tab labeled **"Variables"** atau **"Settings"**
- Click on it

### Step 4: Add 3 Environment Variables

Klik "Add Variable" atau "+" button untuk setiap ini:

| Key | Value |
|-----|-------|
| `MYSQL_URL` | `mysql://root:AARCsfXzm0IwbjCVm8hTUgEyttsYJD@eseau.proxy.rlwy.net:41891/railway` |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |

### Step 5: Save/Deploy
- Click **"Deploy"** or **"Save"** button
- Railway will auto-redeploy the service
- Wait 1-2 minutes for deployment to finish

### Step 6: Verify in Build Logs
After deployment, check **Build Logs** tab for:
```
✅ MYSQL_URL env: SET (mysql://root:AARCsfXzm0IwbjCVm8hTUgEyttsYJD@...)
✅ MySQL Config parsed successfully
✅ Berhasil terhubung ke database!
```

### Step 7: Test API
```
https://projectfullstack-production-28be.up.railway.app/api/flights
```

Should return JSON array of flights (status 200).

## 🔧 If Still Error

Check logs untuk:
```
❌ DATABASE CONNECTION ERROR:
   Message: (see actual error)
   Code: (connection code)
   Config Host: eseau.proxy.rlwy.net
   Config Port: 41891
```

## ⚠️ Common Issues

**Issue: "Cannot GET /"**
- Means server is running but env vars not loaded
- Check if MYSQL_URL is actually SET in Railway Variables tab

**Issue: "Connection refused"**
- Check if port 41891 is accessible (Railway MySQL should allow it)
- Verify MYSQL_URL credentials are correct

**Issue: "Injected env (0)"**
- Environment variables are NOT set in Railway
- Must manually add them in Railway Dashboard Variables tab
