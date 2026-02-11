'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Header from '@/components/common/Header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ShopHub - Your Ultimate Shopping Destination</title>
        <meta name="description" content="Shop the latest trends in electronics, fashion, beauty and more" />
      </head>
      <body>
        <Provider store={store}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-neutral-900 text-white py-12 mt-20">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-display text-xl font-bold mb-4">ShopHub</h3>
                  <p className="text-neutral-400">
                    Your ultimate shopping destination for quality products at great prices.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-neutral-400">
                    <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
                    <li><a href="/cart" className="hover:text-white transition-colors">Cart</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Categories</h4>
                  <ul className="space-y-2 text-neutral-400">
                    <li><a href="/products?category=smartphones" className="hover:text-white transition-colors">Smartphones</a></li>
                    <li><a href="/products?category=laptops" className="hover:text-white transition-colors">Laptops</a></li>
                    <li><a href="/products?category=fragrances" className="hover:text-white transition-colors">Fragrances</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Contact</h4>
                  <ul className="space-y-2 text-neutral-400">
                    <li>Email: support@shophub.com</li>
                    <li>Phone: +91 1234567890</li>
                    <li>Address: Mumbai, India</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
                <p>&copy; 2024 ShopHub. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
