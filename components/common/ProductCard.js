'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { toggleWishlist } from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';
import { formatPrice, calculateDiscount } from '@/utils/helpers';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const [imageError, setImageError] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      product,
      quantity: 1,
      selectedColor: 'Default',
      selectedSize: 'Default',
    }));
  };

  const discountedPrice = calculateDiscount(product.price, product.discountPercentage);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="card overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square bg-neutral-100 overflow-hidden">
          {!imageError ? (
            <Image
              src={product.thumbnail || product.images?.[0] || '/placeholder.png'}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-200">
              <span className="text-neutral-400">No Image</span>
            </div>
          )}

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist ? 'fill-red-600 text-red-600' : 'text-neutral-600'}`}
            />
          </button>

          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Add to Cart</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Brand */}
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
            {product.brand}
          </span>

          {/* Title */}
          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-neutral-600">
              ({product.rating})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mt-auto">
            <span className="text-xl font-bold text-neutral-900">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
