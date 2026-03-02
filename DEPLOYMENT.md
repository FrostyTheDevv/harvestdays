# 🚀 Deployment Guide - Harvest Days

## Quick Deploy to Vercel

### Method 1: One-Click Deploy (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project:**
   ```bash
   cd "C:\Users\billy\OneDrive\Desktop\random game\web-version"
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? **harvest-days** (or your preferred name)
   - Directory? **./** (press Enter)
   - Override settings? **No**

5. **Get your live URL!** Vercel will provide a URL like:
   ```
   https://harvest-days.vercel.app
   ```

### Method 2: GitHub + Vercel (Best for Updates)

1. **Push to GitHub:**
   ```bash
   cd "C:\Users\billy\OneDrive\Desktop\random game\web-version"
   git init
   git add .
   git commit -m "Initial commit - Harvest Days game"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Click "Deploy"

3. **Automatic deployments:** Every push to GitHub will auto-deploy!

### Method 3: Vercel Dashboard Upload

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Click "Deploy" and drag the entire `web-version` folder

4. Vercel will automatically detect Next.js and deploy

## 🎮 Test Your Deployment

Once deployed, test these features:
- ✅ Main menu loads
- ✅ Start new game works
- ✅ Save game persists (localStorage)
- ✅ All activities function properly
- ✅ Responsive on mobile devices

## 🛠️ Build Verification

Before deploying, always verify the build:

```bash
npm run build
```

Expected output: `✓ Compiled successfully`

## 📱 Share Your Game

After deployment, share your game link:
- **Desktop players:** Send the Vercel URL
- **Mobile players:** They can bookmark it to play like an app!

## 🔧 Troubleshooting

### Build fails:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Deployment fails:
- Check `vercel.json` is present
- Verify `package.json` has correct scripts
- Ensure all files are committed (if using Git)

## 📊 Production Checklist

- [x] Build completes successfully
- [x] No TypeScript errors
- [x] All components use proper icons (no emojis)
- [x] Professional farm color palette applied
- [x] Responsive design tested
- [x] localStorage save system working
- [x] README.md included

## 🎨 Current Features

- Professional UI with custom SVG icons
- Farm-themed color scheme
- Fully responsive design
- Browser-based saves
- Complete gameplay loop
- Multiple activities and events

---

**Ready to deploy!** Choose your method above and your game will be live in minutes. 🌾
