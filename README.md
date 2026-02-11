# 🛍️ ShopHub - Mini E-Commerce Frontend

A modern, fully-featured e-commerce frontend built with Next.js, Redux Toolkit, and Tailwind CSS.

## 🎯 Features

### Pages
- **Home Page**: Hero banner, featured categories, trending products section
- **Product Listing Page (PLP)**: Advanced filtering, sorting, search, and pagination
- **Product Detail Page (PDP)**: Image carousel, variant selection, add to cart, wishlist
- **Cart Page**: Quantity management, promo codes, price breakdown, mobile sticky checkout
- **Wishlist Page**: Save favorite products for later

### Key Functionality
- ✅ Redux Toolkit state management for cart, wishlist, and filters
- ✅ LocalStorage persistence for cart and wishlist
- ✅ Real-time search with debouncing
- ✅ Filter by category, brand, price range, and rating
- ✅ Sort by relevance, price, rating, and newest
- ✅ Responsive design (mobile-first approach)
- ✅ Image carousel with navigation
- ✅ Color and size variant selection
- ✅ Promo code system with validation
- ✅ Price calculations with discount, tax, and shipping
- ✅ Checkout modal with form validation
- ✅ Smooth animations and transitions

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (optional)
- **API**: DummyJSON (https://dummyjson.com)

## 📁 Project Structure

```
ecommerce-app/
├── app/
│   ├── cart/
│   │   └── page.js           # Cart page
│   ├── products/
│   │   ├── [id]/
│   │   │   └── page.js       # Product detail page
│   │   └── page.js           # Product listing page
│   ├── wishlist/
│   │   └── page.js           # Wishlist page
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout with Redux provider
│   └── page.js               # Home page
├── components/
│   ├── common/
│   │   ├── Header.js         # Site header with cart/wishlist badges
│   │   └── ProductCard.js    # Reusable product card component
│   └── home/
│       ├── Hero.js           # Hero section
│       ├── Categories.js     # Category grid
│       └── TrendingProducts.js # Trending products section
├── store/
│   ├── store.js              # Redux store configuration
│   ├── cartSlice.js          # Cart state management
│   ├── wishlistSlice.js      # Wishlist state management
│   └── filtersSlice.js       # Filters state management
├── utils/
│   └── helpers.js            # Helper functions
├── data/
│   └── categories.js         # Static data for categories and promo codes
├── public/
│   └── images/               # Static images
├── package.json
├── tailwind.config.js        # Tailwind configuration
├── next.config.js            # Next.js configuration
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn installed

### Steps

1. **Extract the project files**
   ```bash
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder to Netlify

## 🎨 Design Features

- **Custom Color Scheme**: Red and amber gradient theme
- **Typography**: Syne (display) + DM Sans (body) fonts
- **Animations**: Smooth fade-in, slide-up, and scale-in effects
- **Responsive**: Mobile-first design with sticky headers and mobile checkout bar
- **Loading States**: Skeleton loaders for better UX
- **Custom Components**: Reusable, well-structured components

## 🔑 Key Components

### Header
- Sticky navigation
- Cart and wishlist badges with item counts
- Mobile responsive menu

### ProductCard
- Quick add to cart
- Wishlist toggle
- Discount badges
- Rating display
- Hover effects

### Filters & Search
- Real-time search with debouncing
- Category, brand, price, and rating filters
- Sort options
- Mobile-friendly filter panel

### Cart
- Quantity management
- Remove items
- Promo code system (SAVE10, SAVE20, WELCOME)
- Price breakdown with tax and shipping
- Mobile sticky checkout bar
- Checkout modal with form

## 📦 API Integration

Uses DummyJSON API:
- Products: `https://dummyjson.com/products`
- Product Details: `https://dummyjson.com/products/{id}`
- Category Products: `https://dummyjson.com/products/category/{category}`

## 💾 State Management

### Cart State
- Add/remove items
- Update quantities
- Apply/remove promo codes
- Persist to localStorage

### Wishlist State
- Toggle products in/out
- Persist to localStorage

### Filters State
- Category, brand, price range, rating
- Search query
- Sort options

## 🎯 Promo Codes

Available promo codes:
- `SAVE10` - 10% discount
- `SAVE20` - 20% discount
- `WELCOME` - 15% discount

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🧪 Testing

To test the application:
1. Browse products on the home page
2. Click on categories or "View All"
3. Use filters and search on the products page
4. Click on a product to view details
5. Select color/size variants
6. Add items to cart and wishlist
7. Adjust quantities in cart
8. Apply promo codes
9. Complete checkout

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Fonts
Update in `app/globals.css`:
```css
@import url('your-google-fonts-url');
```

## 📝 License

This project is for educational purposes as part of a frontend assignment.

## 👨‍💻 Developer Notes

- All components are client-side rendered using 'use client'
- Redux state is persisted to localStorage
- Mobile-first responsive design approach
- Optimized images using Next.js Image component
- Debounced search for better performance
- Form validation in checkout modal

## 🔗 Links

- **Live Demo**: [Deploy to get link]
- **GitHub**: [Your repo link]
- **API Documentation**: https://dummyjson.com/docs

## 📞 Support

For any questions or issues:
- Create an issue on GitHub
- Email: your-email@example.com

---

Built with ❤️ using Next.js and Tailwind CSS
