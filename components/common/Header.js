'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-display text-2xl font-bold gradient-text hidden sm:block">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-700 hover:text-red-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-neutral-700 hover:text-red-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/products?category=smartphones" className="text-neutral-700 hover:text-red-600 font-medium transition-colors">
              Categories
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <Search className="w-5 h-5 text-neutral-600" />
            </Link>

            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <Heart className="w-5 h-5 text-neutral-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-neutral-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-600" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-neutral-700 hover:text-red-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-neutral-700 hover:text-red-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/products?category=smartphones"
                className="text-neutral-700 hover:text-red-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
