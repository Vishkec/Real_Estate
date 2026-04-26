# Deployment Guide

This project has two parts:

- `frontend`: React app
- `backend`: Express API with MongoDB and Twilio

## 1. Push the code to GitHub

Install Git if needed, then run these commands from the project root:

```powershell
git init
git add .
git commit -m "Prepare app for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

After the first push, future updates are:

```powershell
git add .
git commit -m "Describe your changes"
git push
```

## 2. Create MongoDB Atlas database

1. Create a free MongoDB Atlas cluster.
2. Create a database user.
3. Allow access from your deployment provider.
4. Copy the connection string and save it as `MONGODB_URI`.

## 3. Deploy the backend on Render

1. Create a new `Web Service`.
2. Connect your GitHub repo.
3. Set:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add these environment variables:
   - `PORT=10000`
   - `MONGODB_URI=your_mongodb_atlas_connection_string`
   - `CLIENT_ORIGIN=https://your-frontend-domain.vercel.app`
   - `TWILIO_ACCOUNT_SID=your_twilio_account_sid`
   - `TWILIO_AUTH_TOKEN=your_twilio_auth_token`
   - `TWILIO_PHONE_NUMBER=your_twilio_number`
   - `TWILIO_TO_PHONE_NUMBER=your_destination_number`
5. Deploy and copy the backend URL, for example `https://your-backend.onrender.com`.

Test:

```text
https://your-backend.onrender.com/api/health
```

## 4. Deploy the frontend on Vercel

1. Create a new Vercel project from the same GitHub repo.
2. Set:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Add this environment variable:
   - `REACT_APP_API_URL=https://your-backend.onrender.com`
4. Deploy.

## 5. Update backend CORS origin

After Vercel gives you the frontend URL, make sure Render `CLIENT_ORIGIN` matches it exactly.

If you later add a custom domain, update `CLIENT_ORIGIN` again.

## Notes

- Do not push your real `.env` file to GitHub.
- If Twilio credentials were already committed or shared, rotate them in Twilio before deployment.
- The frontend can work without a local `.env` during local development because CRA proxy handles `/api`, but production should use `REACT_APP_API_URL`.
