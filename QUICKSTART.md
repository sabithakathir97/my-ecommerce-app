# ⚡ Quick Start Guide

## Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd ecommerce-app
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to `http://localhost:3000`

## 🎯 What You'll See

### Home Page (/)
- Hero banner with call-to-action
- Category grid with 6 categories
- Trending products section (8 products)

### Products Page (/products)
- Filter sidebar (category, brand, price, rating)
- Search bar
- Sort dropdown
- Product grid with pagination
- 12 products per page

### Product Detail (/products/[id])
- Image carousel (3+ images)
- Color selector (5 colors)
- Size selector (S, M, L, XL)
- Quantity picker
- Add to cart button
- Wishlist toggle
- Similar products section

### Cart (/cart)
- Cart items with quantity controls
- Remove button per item
- Promo code input
- Price breakdown (subtotal, discount, tax, shipping)
- Mobile sticky checkout bar
- Checkout modal

### Wishlist (/wishlist)
- Saved products
- Quick add to cart from wishlist

## 🎨 Features to Test

### 1. Add Products to Cart
- Click any product card
- Select color and size
- Adjust quantity
- Click "Add to Cart"
- View cart badge update

### 2. Apply Promo Code
- Go to cart
- Enter: `SAVE10`, `SAVE20`, or `WELCOME`
- Click "Apply"
- See discount applied

### 3. Filter Products
- Go to /products
- Select category (e.g., "Smartphones")
- Adjust price range slider
- Select minimum rating
- See filtered results

### 4. Search Products
- Type in search bar on products page
- See real-time results
- Try: "iPhone", "MacBook", "Calvin Klein"

### 5. Sort Products
- Use sort dropdown
- Try: Price Low to High, Rating, Newest

### 6. Wishlist
- Click heart icon on any product
- Go to /wishlist
- See saved items
- Click heart again to remove

### 7. Checkout Flow
- Add items to cart
- Apply promo code
- Click "Proceed to Checkout"
- Fill form
- Click "Place Order"
- See success message

## 📱 Mobile Testing

Test on different screen sizes:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Features
- Hamburger menu
- Sticky checkout bar in cart
- Mobile-optimized filters
- Touch-friendly interactions

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: { /* Change red colors */ },
  accent: { /* Change amber colors */ },
}
```

### Change Fonts
Edit `app/globals.css`:
```css
@import url('your-fonts-here');
```

Then update in `tailwind.config.js`:
```js
fontFamily: {
  display: ['Your Display Font', 'sans-serif'],
  body: ['Your Body Font', 'sans-serif'],
}
```

### Add More Products
The app uses DummyJSON API. To add categories:
1. Edit `data/categories.js`
2. Add new category object
3. Products auto-load from API

## 🐛 Common Issues & Fixes

### Images Not Loading
- Wait a few seconds (API delay)
- Check internet connection
- DummyJSON might be down (rare)

### Cart Not Persisting
- Check browser's localStorage
- Try different browser
- Clear cache if needed

### Filters Not Working
- Reload page
- Check console for errors
- Verify all components loaded

## 📚 Code Structure

```
Key Files to Understand:
├── app/layout.js         # Redux provider wrapper
├── store/cartSlice.js    # Cart logic
├── utils/helpers.js      # Reusable functions
└── components/common/    # Shared components
```

## 🎓 Learning Points

This project demonstrates:
- ✅ Next.js App Router
- ✅ Redux Toolkit state management
- ✅ LocalStorage persistence
- ✅ Responsive design patterns
- ✅ Component reusability
- ✅ Form handling
- ✅ API integration
- ✅ Client-side filtering/sorting
- ✅ Image optimization
- ✅ Animation effects

## 🚀 Next Steps

1. **Deploy**: Follow DEPLOYMENT.md
2. **Customize**: Change colors, fonts, layout
3. **Extend**: Add user authentication, real backend
4. **Optimize**: Add more animations, improve UX

## 💡 Pro Tips

- Use Redux DevTools for debugging
- Test on real mobile devices
- Check Network tab for API calls
- Use Lighthouse for performance

## 📞 Need Help?

- Check README.md for full documentation
- Review code comments
- Check DummyJSON docs: https://dummyjson.com/docs
- Test each feature step by step

---

Happy coding! 🚀
