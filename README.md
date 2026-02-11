# 🛍️ ShopHub - Mini E-Commerce Frontend

A modern, feature-rich e-commerce web application built with Next.js, Redux Toolkit, and Tailwind CSS. This project demonstrates a complete shopping experience with advanced filtering, cart management, and responsive design.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764abc)](https://redux-toolkit.js.org/)

## 🌐 Live Demo

**Hosted Link:** [https://sabitha-shophub.netlify.app/]

**GitHub Repository:** [https://github.com/sabithakathir97/my-ecommerce-app]

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Design Choices](#-design-choices)
- [Pages Overview](#-pages-overview)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Assignment Requirements](#-assignment-requirements)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- 🏠 **Home Page** - Hero banner, featured categories, trending products
- 🔍 **Product Listing** - Advanced filtering, search, sorting, pagination
- 📦 **Product Details** - Image carousel, variant selection, add to cart
- 🛒 **Shopping Cart** - Quantity management, promo codes, price breakdown
- ❤️ **Wishlist** - Save favorite products for later
- 📱 **Responsive Design** - Mobile-first, works on all devices

### Advanced Features
- ✅ Real-time search with debouncing
- ✅ Multi-criteria filtering (category, brand, price, rating)
- ✅ Multiple sorting options
- ✅ LocalStorage persistence for cart and wishlist
- ✅ Promo code validation system
- ✅ Dynamic price calculations (discount, tax, shipping)
- ✅ Image carousel with navigation
- ✅ Color and size variant selection
- ✅ Checkout modal with form validation
- ✅ Smooth animations and transitions
- ✅ Loading skeleton states

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library

### State Management
- **Redux Toolkit** - Centralized state management
- **React-Redux** - React bindings for Redux

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **CSS3** - Custom animations and transitions

### Additional Libraries
- **Lucide React** - Icon library
- **Framer Motion** - Animation library (optional)

### API
- **DummyJSON** - Mock e-commerce API for products data

### Deployment
- **Vercel** / **Netlify** - Hosting platform

---

## 📁 Project Structure

```
ecommerce-app/
│
├── 📁 app/                          # Next.js App Router - All pages
│   ├── 📁 cart/
│   │   └── page.js                  # Cart page with checkout
│   ├── 📁 products/
│   │   ├── 📁 [id]/
│   │   │   └── page.js              # Product detail page (dynamic route)
│   │   └── page.js                  # Product listing page with filters
│   ├── 📁 wishlist/
│   │   └── page.js                  # Wishlist page
│   ├── layout.js                    # Root layout with Redux Provider
│   ├── page.js                      # Home page
│   └── globals.css                  # Global styles & custom CSS
│
├── 📁 components/                   # Reusable React components
│   ├── 📁 common/                   # Shared across pages
│   │   ├── Header.js                # Navigation with cart/wishlist badges
│   │   └── ProductCard.js           # Reusable product display card
│   └── 📁 home/                     # Home page specific components
│       ├── Hero.js                  # Hero section with CTA
│       ├── Categories.js            # Category grid display
│       └── TrendingProducts.js      # Trending products section
│
├── 📁 store/                        # Redux state management
│   ├── store.js                     # Redux store configuration
│   ├── cartSlice.js                 # Cart state & actions
│   ├── wishlistSlice.js             # Wishlist state & actions
│   └── filtersSlice.js              # Product filters state & actions
│
├── 📁 utils/                        # Helper functions & utilities
│   └── helpers.js                   # formatPrice, filterProducts, sortProducts, etc.
│
├── 📁 data/                         # Static data & constants
│   └── categories.js                # Categories, brands, promo codes data
│
├── 📁 public/                       # Static assets
│   └── 📁 images/                   # Image files
│
├── 📄 package.json                  # Project dependencies
├── 📄 next.config.js                # Next.js configuration
├── 📄 tailwind.config.js            # Tailwind CSS configuration
├── 📄 postcss.config.js             # PostCSS configuration
├── 📄 jsconfig.json                 # Path aliases (@/ mapping)
├── 📄 .eslintrc.json                # ESLint configuration
├── 📄 .gitignore                    # Git ignore rules
└── 📄 README.md                     # Project documentation (this file)
```

### Folder Descriptions

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js pages using App Router architecture |
| `components/` | Reusable UI components organized by usage |
| `store/` | Redux state management slices and configuration |
| `utils/` | Helper functions for formatting, filtering, sorting |
| `data/` | Static data like categories, brands, promo codes |
| `public/` | Static assets accessible from root URL |

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Git installed

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 💻 Usage

### Home Page
- Browse featured categories
- View trending products
- Quick navigation to product listings

### Product Listing Page
1. Use the **search bar** to find products
2. Apply **filters** (category, brand, price range, rating)
3. **Sort** products by relevance, price, or rating
4. Navigate through pages using **pagination**

### Product Detail Page
1. View product images in the **carousel**
2. Select **color** and **size** variants
3. Adjust **quantity**
4. Click **Add to Cart** or add to **Wishlist**

### Shopping Cart
1. Review items in cart
2. Update quantities or remove items
3. Apply **promo codes** (SAVE10, SAVE20, WELCOME)
4. View price breakdown
5. Click **Proceed to Checkout**
6. Fill checkout form and place order

### Promo Codes
- `SAVE10` - 10% discount
- `SAVE20` - 20% discount
- `WELCOME` - 15% discount

---

## 🎨 Design Choices

### Color Palette

The color scheme was carefully chosen to create an engaging shopping experience:

- **Primary Red** (`#dc2626` → `#991b1b`)
  - Creates urgency and excitement
  - Draws attention to CTAs and important elements
  - Associated with sales and discounts

- **Accent Amber** (`#f59e0b` → `#92400e`)
  - Adds warmth and approachability
  - Complements the red without overwhelming
  - Creates visual hierarchy

- **Neutral Gray** (`#f5f5f5` background, `#171717` text)
  - Provides clean, modern aesthetic
  - Ensures readability
  - Doesn't compete with product images

**Rationale:** Red is proven to increase conversion rates in e-commerce by creating a sense of urgency. The gradient adds depth and modern feel.

### Typography

- **Display Font:** Syne
  - Bold, geometric, modern
  - Used for headings and brand name
  - Creates strong visual hierarchy

- **Body Font:** DM Sans
  - Clean, highly readable
  - Professional and contemporary
  - Excellent for product descriptions

**Rationale:** Contrast between display and body fonts improves scannability. Both fonts are optimized for screen reading.

### Component Architecture

**Reusable ProductCard Component**
- Single source of truth for product display
- Used across home, listing, wishlist, and related products
- Reduces code duplication (DRY principle)
- Ensures consistent product presentation

**Shared Header Component**
- Displays cart and wishlist item counts
- Responsive navigation
- Sticky positioning for easy access

**Rationale:** Component reusability improves maintainability and ensures consistent UX across the application.

### State Management Strategy

**Redux Toolkit** was chosen for:
- Predictable state updates
- Easy debugging with Redux DevTools
- Built-in persistence capabilities
- Scalability for future features

**LocalStorage Integration**
- Cart persists across sessions
- Wishlist survives page refresh
- Better user experience

**Rationale:** Users expect their cart to persist. LocalStorage provides this without backend complexity.

### Performance Optimizations

1. **Next.js Image Component**
   - Automatic image optimization
   - Lazy loading
   - Responsive images

2. **Debounced Search**
   - 300ms delay prevents excessive API calls
   - Smoother user experience

3. **Pagination**
   - Limits initial load to 12 products
   - Faster page rendering
   - Reduces memory usage

4. **Code Splitting**
   - Automatic with Next.js
   - Faster initial page load

---

## 📄 Pages Overview

### 1. Home Page (`/`)
- **Purpose:** Landing page to engage users
- **Features:**
  - Hero section with call-to-action
  - Featured categories (6 items)
  - Trending products (8 items)
  - Statistics display
- **Components:** Hero, Categories, TrendingProducts

### 2. Product Listing Page (`/products`)
- **Purpose:** Browse and filter all products
- **Features:**
  - Real-time search
  - Multi-criteria filtering
  - Sorting options
  - Pagination (12 per page)
  - Mobile filter drawer
- **State:** Uses Redux filters slice

### 3. Product Detail Page (`/products/[id]`)
- **Purpose:** View product details and variants
- **Features:**
  - Image carousel (3+ images)
  - Variant selection (color, size)
  - Quantity picker
  - Add to cart/wishlist
  - Similar products
  - Breadcrumb navigation
- **Dynamic Route:** Uses Next.js dynamic routing

### 4. Cart Page (`/cart`)
- **Purpose:** Review and modify cart items
- **Features:**
  - Item summary with images
  - Quantity controls
  - Remove items
  - Promo code validation
  - Price breakdown
  - Mobile sticky checkout bar
  - Checkout modal
- **State:** Uses Redux cart slice

### 5. Wishlist Page (`/wishlist`)
- **Purpose:** View saved products
- **Features:**
  - Saved products display
  - Quick add to cart
  - Empty state message
- **State:** Uses Redux wishlist slice

---

## 🔄 State Management

### Redux Store Structure

```javascript
{
  cart: {
    items: [],           // Array of cart items
    promoCode: null,     // Applied promo code
    discount: 0          // Discount percentage
  },
  wishlist: {
    items: []            // Array of wishlist items
  },
  filters: {
    category: '',        // Selected category
    brand: '',           // Selected brand
    priceRange: [0, 2000], // Price filter
    rating: 0,           // Minimum rating
    searchQuery: '',     // Search text
    sortBy: 'relevance'  // Sort option
  }
}
```

### Key Actions

**Cart Actions:**
- `addToCart` - Add product with variants
- `removeFromCart` - Remove item
- `updateQuantity` - Change quantity
- `applyPromoCode` - Apply discount code
- `clearCart` - Empty cart

**Wishlist Actions:**
- `toggleWishlist` - Add/remove from wishlist

**Filter Actions:**
- `setCategory`, `setBrand`, `setPriceRange`, `setRating`, `setSearchQuery`, `setSortBy`
- `resetFilters` - Clear all filters

---

## 🌐 API Integration

### DummyJSON API Endpoints

```javascript
// Fetch all products
GET https://dummyjson.com/products?limit=100

// Fetch single product
GET https://dummyjson.com/products/{id}

// Fetch products by category
GET https://dummyjson.com/products/category/{category}
```

### API Usage Examples

**Product Listing:**
```javascript
fetch('https://dummyjson.com/products?limit=100')
  .then(res => res.json())
  .then(data => setProducts(data.products))
```

**Product Details:**
```javascript
fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(data => setProduct(data))
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

**Or use GitHub integration:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag `out` folder to Netlify dashboard
   - Or connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

### Environment Variables

No environment variables required! The app uses the public DummyJSON API.

---

## ✅ Assignment Requirements

All requirements successfully implemented:

### Pages ✅
- ✅ Home Page with hero, categories, trending products
- ✅ Product Listing Page with filters, search, sort, pagination
- ✅ Product Detail Page with carousel, variants, add to cart
- ✅ Cart Page with checkout modal
- ✅ **Bonus:** Wishlist Page

### Technical Requirements ✅
- ✅ Next.js with App Router
- ✅ Tailwind CSS for styling
- ✅ Redux Toolkit for state management
- ✅ LocalStorage persistence
- ✅ Component-driven architecture
- ✅ Mobile-first responsive design

### Features ✅
- ✅ Filtering (category, brand, price, rating)
- ✅ Sorting (relevance, price, rating, newest)
- ✅ Search with debouncing
- ✅ Pagination / Infinite scroll
- ✅ Image carousel
- ✅ Variant selection (color, size)
- ✅ Promo code system
- ✅ Price calculations

### Deliverables ✅
- ✅ GitHub repository
- ✅ Hosted link (Vercel/Netlify)
- ✅ Clear folder structure
- ✅ Comprehensive README

---

## 🔮 Future Enhancements

Potential features for expansion:
- User authentication and profiles
- Product reviews and ratings system
- Order history
- Payment gateway integration
- Product recommendations (ML-based)
- Advanced search with filters
- Multi-currency support
- Dark mode toggle
- Product comparison feature
- Social sharing

---

## 📸 Screenshots

### Home Page
[Add screenshot here]

### Product Listing
[Add screenshot here]

### Product Detail
[Add screenshot here]

### Shopping Cart
[Add screenshot here]

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Home page loads correctly
- [ ] Categories navigate to filtered products
- [ ] Search returns relevant results
- [ ] Filters work correctly
- [ ] Sort options change product order
- [ ] Pagination works
- [ ] Product detail page displays correctly
- [ ] Image carousel navigates
- [ ] Add to cart updates badge
- [ ] Cart calculations are correct
- [ ] Promo codes validate
- [ ] Wishlist toggle works
- [ ] Mobile responsive on all pages
- [ ] LocalStorage persists data

---

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 📄 License

This project is created for educational purposes as part of a frontend development assignment.

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [DummyJSON API](https://dummyjson.com)
- [Lucide Icons](https://lucide.dev)

---

## 📞 Support

For questions or issues:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact via email

---

**Built with ❤️ using Next.js and Tailwind CSS**

*Last Updated: [11-02-2026]*
