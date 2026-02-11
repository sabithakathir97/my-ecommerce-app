'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';

export default function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="container-custom py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="w-32 h-32 bg-neutral-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-16 h-16 text-neutral-400" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-neutral-600 mb-8">
            Start adding products you love to your wishlist.
          </p>
          <Link href="/products" className="btn-primary">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
          My Wishlist
        </h1>
        <p className="text-neutral-600">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
