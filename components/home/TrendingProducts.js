'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Trending Products
              </h2>
              <p className="text-neutral-600">
                Most popular items this week
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center space-x-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-square bg-neutral-200 skeleton"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-neutral-200 rounded skeleton w-1/4"></div>
                  <div className="h-6 bg-neutral-200 rounded skeleton w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded skeleton w-1/2"></div>
                  <div className="h-6 bg-neutral-200 rounded skeleton w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/products" className="btn-secondary">
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
