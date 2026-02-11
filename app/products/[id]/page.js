'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Star, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { addToCart } from '@/store/cartSlice';
import { toggleWishlist } from '@/store/wishlistSlice';
import { formatPrice, calculateDiscount } from '@/utils/helpers';
import ProductCard from '@/components/common/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [showSuccess, setShowSuccess] = useState(false);

  const colors = ['Black', 'White', 'Blue', 'Red', 'Gray'];
  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    if (params.id) {
      // Fetch product details
      fetch(`https://dummyjson.com/products/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);

          // Fetch related products
          if (data.category) {
            fetch(`https://dummyjson.com/products/category/${data.category}?limit=4`)
              .then(res => res.json())
              .then(categoryData => {
                setRelatedProducts(categoryData.products.filter(p => p.id !== data.id));
              });
          }
        })
        .catch(err => {
          console.error('Error fetching product:', err);
          setLoading(false);
        });
    }
  }, [params.id]);

  const isInWishlist = product && wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity,
      selectedColor,
      selectedSize,
    }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
  };

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-neutral-200 rounded-xl skeleton"></div>
          <div className="space-y-6">
            <div className="h-8 bg-neutral-200 rounded skeleton w-3/4"></div>
            <div className="h-12 bg-neutral-200 rounded skeleton w-1/2"></div>
            <div className="h-32 bg-neutral-200 rounded skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const discountedPrice = calculateDiscount(product.price, product.discountPercentage);

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-red-600">Products</Link>
        <span>/</span>
        <span className="text-neutral-900">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-neutral-100 rounded-xl overflow-hidden">
            <Image
              src={product.images[currentImageIndex] || product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-8"
            />

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                -{Math.round(product.discountPercentage)}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-square bg-neutral-100 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index
                    ? 'border-red-600 ring-2 ring-red-200'
                    : 'border-transparent hover:border-neutral-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <div>
            <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              {product.brand}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-neutral-600">
              {product.rating} ({product.reviews?.length || Math.floor(product.rating * 100)} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-4 border-t border-b border-neutral-200 py-6">
            <span className="text-4xl font-bold text-neutral-900">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-2xl text-neutral-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-green-600 font-semibold">
                  Save {formatPrice(product.price - discountedPrice)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Color: <span className="text-neutral-600">{selectedColor}</span>
            </label>
            <div className="flex items-center space-x-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    selectedColor === color
                      ? 'border-red-600 ring-2 ring-red-200 scale-110'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                  }}
                >
                  {selectedColor === color && (
                    <Check className="w-6 h-6 mx-auto text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Size: <span className="text-neutral-600">{selectedSize}</span>
            </label>
            <div className="flex items-center space-x-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-lg border-2 font-semibold transition-all ${
                    selectedSize === size
                      ? 'border-red-600 bg-red-50 text-red-600 scale-110'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold mb-3">Quantity</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-neutral-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-16 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm text-neutral-600">
                {product.stock} items in stock
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`btn-secondary flex items-center justify-center space-x-2 ${
                isInWishlist ? 'bg-red-50 border-red-200 text-red-600' : ''
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isInWishlist ? 'fill-red-600' : ''}`}
              />
              <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2 animate-slide-up">
              <Check className="w-5 h-5" />
              <span>Added to cart successfully!</span>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
