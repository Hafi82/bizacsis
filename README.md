# Excellence Graphics - Account Management System

A full-stack customer account management system with premium UI, cloud backend, and hybrid storage.

## 🌟 Features

### Customer Management
- ✅ Add, view, edit, and delete customers
- ✅ Track customer names and addresses
- ✅ Payment status tracking (None/Partial/Full)
- ✅ Automatic ID generation
- ✅ Timestamp tracking

### Payment Tracking
- ✅ Filter customers by payment status
- ✅ Visual payment badges
- ✅ Quick payment status overview

### Premium UI
- ✅ Modern glassmorphic design
- ✅ Dark theme with vibrant gradients
- ✅ Smooth animations and transitions
- ✅ Fully responsive layout
- ✅ Mobile-friendly interface

### Hybrid Storage
- ✅ **Offline Mode**: Works with browser localStorage
- ✅ **Online Mode**: Connects to cloud backend API
- ✅ Toggle between modes with simple configuration
- ✅ No data loss when switching modes

---

## 🚀 Quick Start

### Option 1: Offline Mode (No Setup Required)

1. Open `index.html` in your browser
2. Start adding customers immediately
3. Data stored in browser localStorage

**Perfect for**: Single device, personal use, no installation needed

### Option 2: Online Mode (Cloud Backend)

1. Deploy backend to Render.com (free)
2. Update `app.js` configuration
3. Access from any device with shared data

**Perfect for**: Multiple devices, team collaboration, cloud storage

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📁 Project Structure

```
Accounts- Excellence Graphics/
├── Frontend Files
│   ├── index.html          # Main application page
│   ├── styles.css          # Premium UI design
│   └── app.js              # Hybrid frontend logic
│
├── Backend Files (for cloud deployment)
│   ├── server.js           # Express API server
│   ├── database.js         # PostgreSQL operations
│   └── package.json        # Dependencies
│
├── Deployment
│   ├── render.yaml         # Render.com configuration
│   ├── .env.example        # Environment variables template
│   └── .gitignore          # Git ignore rules
│
└── Documentation
    ├── README.md           # This file
    ├── DEPLOYMENT_GUIDE.md # Step-by-step deployment
    └── HOW_TO_USE.md       # User guide
```

---

## ⚙️ Configuration

### Switch Between Offline and Online Mode

Open `app.js` and change the configuration at the top:

```javascript
// CONFIGURATION
const USE_BACKEND = false;  // Change to true for online mode
const API_URL = 'https://your-service-name.onrender.com/api/customers';
```

- **`USE_BACKEND = false`**: Uses localStorage (offline)
- **`USE_BACKEND = true`**: Uses backend API (online)

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Glassmorphic design)
- Vanilla JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- PostgreSQL
- CORS

### Deployment
- Frontend: GitHub Pages
- Backend: Render.com (free tier)
- Database: PostgreSQL (managed by Render)

---

## 📡 API Endpoints

### Get All Customers
```
GET /api/customers
GET /api/customers?payment_status=Partial
GET /api/customers?payment_status=Full
```

### Get Single Customer
```
GET /api/customers/:id
```

### Create Customer
```
POST /api/customers
Content-Type: application/json

{
  "name": "Customer Name",
  "address": "Customer Address",
  "payment_status": "None"
}
```

### Update Customer
```
PUT /api/customers/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "address": "Updated Address",
  "payment_status": "Partial"
}
```

### Delete Customer
```
DELETE /api/customers/:id
```

### Health Check
```
GET /health
```

---

## 🚀 Deployment

### Deploy Backend to Render.com

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Deploy with Blueprint**
   - Click "New +" → "Blueprint"
   - Select your repository
   - Render will auto-deploy from `render.yaml`

4. **Get Your API URL**
   - Copy the URL from Render dashboard
   - Update `app.js` configuration

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

### Deploy Frontend to GitHub Pages

1. Go to repository Settings → Pages
2. Select `main` branch as source
3. Your site will be at: `https://yourusername.github.io/repository-name`

---

## 💾 Data Storage

### Offline Mode (localStorage)
- Data stored in browser
- Persists between sessions
- Separate data per browser
- Lost if cache is cleared

### Online Mode (PostgreSQL)
- Data stored in cloud database
- Accessible from any device
- Shared across users
- Permanent storage (with paid tier)

---

## 🆘 Troubleshooting

### Can't Save Customers
- Check if `USE_BACKEND` is set correctly in `app.js`
- If using backend, verify API URL is correct
- Check browser console for errors

### Backend Not Working
- Verify backend is deployed on Render
- Check service status in Render dashboard
- Test health endpoint: `https://your-url.onrender.com/health`
- Review logs in Render dashboard

### CORS Errors
- Update `CORS_ORIGIN` environment variable in Render
- Make sure it matches your GitHub Pages URL
- Redeploy after changing environment variables

### Data Not Syncing
- Verify `USE_BACKEND = true` in `app.js`
- Check network tab in browser DevTools
- Ensure backend service is running

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**: Complete deployment instructions for Render.com
- **[HOW_TO_USE.md](HOW_TO_USE.md)**: User guide for the application
- **[.env.example](.env.example)**: Environment variables template

---

## 🔐 Environment Variables

Required for backend deployment:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Auto-set by Render |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `production` |
| `CORS_ORIGIN` | Allowed frontend URL | `https://yourusername.github.io` |

---

## 💰 Cost

### Free Tier (Render.com)
- ✅ 750 hours/month (24/7 uptime)
- ✅ PostgreSQL database (90 days free)
- ✅ Automatic SSL
- ⚠️ Service sleeps after 15 min inactivity
- ⚠️ First request after sleep: ~30 seconds

### Paid Tier (Optional)
- Permanent database storage
- No sleep time
- Better performance
- Starting at $7/month

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

ISC License - Feel free to use for personal or commercial projects

---

## 🔗 Links

- **Live Demo**: [Your GitHub Pages URL]
- **Backend API**: [Your Render URL]
- **Repository**: [Your GitHub Repo]

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review Render logs for backend issues
3. Check browser console for frontend errors
4. Open an issue on GitHub

---

**Built with ❤️ for Excellence Graphics**
