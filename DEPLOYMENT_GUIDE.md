# 🚀 Deployment Guide - Render.com

Complete step-by-step guide to deploy your Excellence Graphics backend to Render.com for free.

## 📋 Prerequisites

- ✅ GitHub account
- ✅ GitHub repository with your code
- ✅ Render.com account (free - sign up with GitHub)

---

## Step 1: Prepare Your GitHub Repository

### 1.1 Push Backend Files to GitHub

Make sure all these files are in your repository:
- `server.js`
- `database.js`
- `package.json`
- `render.yaml`
- `.env.example`
- `.gitignore`

```bash
# Navigate to your project folder
cd "c:\Users\Aysha\Desktop\My Softwares\Accounts- Excellence Graphics"

# Add all files
git add .

# Commit changes
git commit -m "Add backend for Render deployment"

# Push to GitHub
git push origin main
```

### 1.2 Verify Repository

Go to your GitHub repository and make sure all files are there.

---

## Step 2: Create Render Account

### 2.1 Sign Up
1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Choose **"Sign up with GitHub"**
4. Authorize Render to access your GitHub account

### 2.2 Connect Repository
1. Render will ask for repository access
2. Choose **"Only select repositories"**
3. Select your Excellence Graphics repository
4. Click **"Install & Authorize"**

---

## Step 3: Deploy with Blueprint (Automatic)

Render will automatically detect the `render.yaml` file and deploy everything!

### 3.1 Create New Blueprint
1. From Render Dashboard, click **"New +"**
2. Select **"Blueprint"**
3. Choose your repository from the list
4. Render will read `render.yaml` and show:
   - ✅ Web Service: `excellence-graphics-api`
   - ✅ PostgreSQL Database: `excellence-graphics-db`
5. Click **"Apply"**

### 3.2 Wait for Deployment
- Database creation: ~2 minutes
- Service deployment: ~3-5 minutes
- Total time: ~5-7 minutes

You'll see:
```
✓ Database created
✓ Installing dependencies
✓ Starting server
✓ Health check passed
✓ Deploy live
```

---

## Step 4: Get Your API URL

### 4.1 Find Your Service URL
1. Go to **Dashboard** → **excellence-graphics-api**
2. At the top, you'll see your URL:
   ```
   https://excellence-graphics-api.onrender.com
   ```
3. **Copy this URL** - you'll need it for the frontend!

### 4.2 Test Your API
Open in browser:
```
https://your-service-name.onrender.com/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Excellence Graphics API is running"
}
```

---

## Step 5: Update Frontend to Use Backend

### 5.1 Update app.js Configuration

Open `app.js` and find the top of the file. Add this configuration:

```javascript
// API Configuration
const USE_BACKEND = true; // Set to false to use localStorage only
const API_URL = 'https://your-service-name.onrender.com/api/customers';
```

Replace `your-service-name` with your actual Render URL.

### 5.2 Make Frontend Hybrid (Optional)

If you want the app to work both online and offline, I can update `app.js` to:
- Try backend API first
- Fall back to localStorage if API is unavailable
- Sync data when connection is restored

---

## Step 6: Deploy Frontend to GitHub Pages

### 6.1 Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be at: `https://yourusername.github.io/repository-name`

### 6.2 Update CORS Settings
1. Go to Render Dashboard → **excellence-graphics-api**
2. Click **Environment**
3. Find `CORS_ORIGIN` variable
4. Update value to your GitHub Pages URL:
   ```
   https://yourusername.github.io
   ```
5. Click **Save Changes**
6. Service will automatically redeploy

---

## 🎉 You're Live!

Your application is now deployed:

- **Frontend**: `https://yourusername.github.io/repository-name`
- **Backend API**: `https://your-service-name.onrender.com`
- **Database**: PostgreSQL (managed by Render)

### Test It:
1. Open your GitHub Pages URL
2. Click "Add Customer"
3. Fill in details and save
4. Open the same URL on a different device
5. You should see the same customer!

---

## 🔧 Managing Your Deployment

### View Logs
1. Go to Render Dashboard
2. Click on **excellence-graphics-api**
3. Click **Logs** tab
4. See real-time server logs

### View Database
1. Go to Render Dashboard
2. Click on **excellence-graphics-db**
3. Click **Connect** → **External Connection**
4. Use these credentials with any PostgreSQL client

### Redeploy
Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update backend"
git push origin main
```

---

## 💰 Free Tier Limits

Render's free tier includes:
- ✅ 750 hours/month (enough for 24/7)
- ✅ PostgreSQL database (90 days, then expires)
- ✅ Automatic SSL certificates
- ⚠️ Service sleeps after 15 min of inactivity
- ⚠️ First request after sleep takes ~30 seconds

### Keep Service Awake (Optional)
Use a service like UptimeRobot to ping your health endpoint every 10 minutes:
```
https://your-service-name.onrender.com/health
```

---

## 🆘 Troubleshooting

### "Build Failed"
- Check that `package.json` is in the repository
- Verify Node.js version in `package.json` engines
- Check build logs in Render dashboard

### "Database Connection Error"
- Wait for database to finish creating
- Check that `DATABASE_URL` environment variable is set
- Verify database is running in Render dashboard

### "CORS Error" in Frontend
- Update `CORS_ORIGIN` in Render environment variables
- Make sure it matches your GitHub Pages URL exactly
- Redeploy after changing environment variables

### "Service Unavailable"
- Service might be sleeping (free tier)
- Wait 30 seconds for it to wake up
- Check service status in Render dashboard

### Frontend Can't Connect
- Verify API URL in `app.js` is correct
- Check that service is running (green status)
- Test health endpoint in browser
- Check browser console for errors

---

## 📚 Next Steps

1. **Custom Domain** (Optional)
   - Add your own domain in Render settings
   - Update DNS records
   - Free SSL included!

2. **Monitoring**
   - Set up UptimeRobot for uptime monitoring
   - Enable email alerts in Render

3. **Backup Database**
   - Export data regularly from Render dashboard
   - Free tier databases expire after 90 days
   - Upgrade to paid tier for permanent storage

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **GitHub Pages**: https://pages.github.com

---

**Need help?** Check the Render logs first, they usually show what went wrong!
