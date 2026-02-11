'use client';

import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { ChevronRight } from 'lucide-react';

export default function Categories() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Shop by Category
            </h2>
            <p className="text-neutral-600">
              Explore our wide range of product categories
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center space-x-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card p-6 text-center hover:shadow-xl transition-all duration-300 h-full animate-scale-in">
                <div className="relative w-24 h-24 mx-auto mb-4 bg-neutral-100 rounded-2xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-red-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  {category.count}+ items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
