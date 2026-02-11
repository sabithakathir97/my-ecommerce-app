# 🚀 Quick Deployment Guide

## Deploy to Vercel (Easiest Method)

### One-Click Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"
   - Get your live URL in ~2 minutes!

### Environment Variables
No environment variables needed! The app uses the public DummyJSON API.

## Alternative: Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Install Netlify CLI: `npm install -g netlify-cli`
   - Run: `netlify deploy --prod`
   - Or drag/drop the `.next` folder to Netlify dashboard

## Testing Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Post-Deployment Checklist

- ✅ Home page loads correctly
- ✅ Products page shows items
- ✅ Product details page works
- ✅ Add to cart functionality
- ✅ Cart calculations correct
- ✅ Wishlist toggle works
- ✅ Filters and search work
- ✅ Mobile responsive
- ✅ Promo codes validate
- ✅ Checkout modal appears

## Troubleshooting

### Issue: Images not loading
**Solution**: Check Next.js image domains in `next.config.js`

### Issue: Redux state not persisting
**Solution**: Clear localStorage and refresh

### Issue: Build fails
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Performance Tips

- Images are optimized with Next.js Image
- Code is automatically split by Next.js
- CSS is purged by Tailwind in production
- LocalStorage reduces API calls

## Security Notes

- No sensitive data stored
- All transactions are mock/demo
- Client-side only (no backend)
- Safe to use sample promo codes

---

Need help? Check the main README.md for detailed documentation.
