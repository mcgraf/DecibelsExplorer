# Deploying Decibel Learning App to Netlify

This guide explains how to deploy your decibel learning app to Netlify. Since your app is currently a full-stack application with an Express backend, we'll deploy it as a static site (the educational content works perfectly without the backend).

## Option 1: Deploy from GitHub (Recommended)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code to the repository:
```bash
git init
git add .
git commit -m "Initial commit - Decibel Learning App"
git remote add origin https://github.com/your-username/decibel-learning-app.git
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Build command**: `vite build`
   - **Publish directory**: `dist/public`
   - **Node version**: 18
5. Click "Deploy site"

## Option 2: Manual Deploy

### Step 1: Build the Static Site
1. In your project directory, run:
```bash
vite build
```

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click "Sites" then "Deploy manually"
3. Drag and drop the `dist/public` folder
4. Your site will be deployed instantly

## Option 3: Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login and Deploy
```bash
netlify login
vite build
netlify deploy
# For production deployment:
netlify deploy --prod
```

## Important Notes

### Static vs Full-Stack
- **Static deployment**: All interactive features work (calculators, animations, quizzes) but no backend data persistence
- **Full-stack deployment**: Would require moving to a platform like Heroku, Railway, or Vercel that supports Node.js servers

### Features That Work in Static Mode
✅ Interactive decibel calculators
✅ Real-world sound examples
✅ Animated 10 dB rule demonstration
✅ Extreme decibel calculator
✅ Educational quizzes and exercises
✅ All visualizations and charts
✅ SEO optimization and OpenGraph tags

### Features That Need Backend (Not Available in Static)
❌ User authentication/profiles
❌ Saving progress/preferences
❌ Database interactions

## Custom Domain (Optional)
After deployment, you can:
1. Go to your site's settings in Netlify
2. Click "Domain management"
3. Add a custom domain name
4. Follow the DNS configuration instructions

## Environment Variables
If you need environment variables:
1. In Netlify dashboard, go to Site settings
2. Click "Environment variables"
3. Add any required variables

## Build Configuration
The `netlify.toml` file is already configured with:
- Build command: `vite build`
- Publish directory: `dist/public`
- Redirect rules for single-page app routing

Your decibel learning app is perfect for static deployment since it's primarily educational content with client-side interactivity!