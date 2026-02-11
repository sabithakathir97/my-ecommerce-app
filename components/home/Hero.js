'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-amber-50 overflow-hidden">
      <div className="container-custom py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-block">
              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                Welcome to ShopHub
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Discover Your
              <span className="gradient-text"> Perfect </span>
              Style
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 max-w-lg">
              Shop the latest trends in electronics, fashion, beauty, and more. 
              Get exclusive deals and fast delivery on all your favorite products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Shop Now</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/products?category=smartphones" className="btn-secondary inline-flex items-center justify-center">
                <span>Browse Categories</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div>
                <div className="text-3xl font-bold gradient-text">10k+</div>
                <div className="text-sm text-neutral-600 mt-1">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">50k+</div>
                <div className="text-sm text-neutral-600 mt-1">Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">4.8★</div>
                <div className="text-sm text-neutral-600 mt-1">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block animate-fade-in">
            <div className="relative w-full h-[500px]">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-red-200 to-amber-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-200 to-red-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Image placeholder - in production, add actual product images */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-40 h-40 bg-white rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300"></div>
                  <div className="w-40 h-40 bg-white rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300 mt-8"></div>
                  <div className="w-40 h-40 bg-white rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300 -mt-8"></div>
                  <div className="w-40 h-40 bg-white rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
