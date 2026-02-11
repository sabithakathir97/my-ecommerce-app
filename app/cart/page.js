'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingBag, Tag, CheckCircle } from 'lucide-react';
import { removeFromCart, updateQuantity, applyPromoCode, removePromoCode, clearCart } from '@/store/cartSlice';
import { formatPrice, calculateDiscount } from '@/utils/helpers';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const promoCode = useSelector((state) => state.cart.promoCode);
  const discount = useSelector((state) => state.cart.discount);

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleQuantityChange = (cartItemId, newQuantity) => {
    dispatch(updateQuantity({ cartItemId, quantity: newQuantity }));
  };

  const handleRemove = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    const validCodes = ['SAVE10', 'SAVE20', 'WELCOME'];
    if (validCodes.includes(promoInput.toUpperCase())) {
      dispatch(applyPromoCode(promoInput));
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    alert('Order placed successfully! 🎉');
    dispatch(clearCart());
    setShowCheckout(false);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = calculateDiscount(item.price, item.discountPercentage);
    return total + (itemPrice * item.quantity);
  }, 0);

  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.18; // 18% GST
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal - discountAmount + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="w-32 h-32 bg-neutral-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-neutral-400" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-neutral-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const itemPrice = calculateDiscount(item.price, item.discountPercentage);
            
            return (
              <div key={item.cartItemId} className="card p-6">
                <div className="flex gap-6">
                  {/* Image */}
                  <Link
                    href={`/products/${item.id}`}
                    className="relative w-24 h-24 bg-neutral-100 rounded-lg flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-grow">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-lg hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-neutral-600 mt-1">
                      {item.brand}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
                      <span>Color: {item.selectedColor}</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xl font-bold">
                        {formatPrice(itemPrice)}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-sm text-neutral-500 line-through">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.cartItemId)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center border border-neutral-200 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Promo Code
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Tag className="w-4 h-4" />
                    <span className="font-semibold">{promoCode}</span>
                  </div>
                  <button
                    onClick={() => dispatch(removePromoCode())}
                    className="text-green-700 hover:text-green-800 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="btn-secondary px-4 py-2 whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-600 text-sm mt-2">{promoError}</p>
                  )}
                  <p className="text-xs text-neutral-500 mt-2">
                    Try: SAVE10, SAVE20, WELCOME
                  </p>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-neutral-200 pt-4">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Tax (GST 18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-neutral-500">
                  Add {formatPrice(500 - subtotal)} more for free shipping
                </p>
              )}

              <div className="flex justify-between text-lg font-bold border-t border-neutral-200 pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setShowCheckout(true)}
              className="btn-primary w-full mt-6"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block text-center text-red-600 font-semibold mt-4 hover:text-red-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 lg:hidden shadow-lg z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-neutral-600">Total</p>
            <p className="text-xl font-bold">{formatPrice(total)}</p>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="font-display text-2xl font-bold mb-6">
              Checkout
            </h2>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Address *
                </label>
                <textarea
                  required
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={checkoutForm.pincode}
                  onChange={(e) => setCheckoutForm({...checkoutForm, pincode: e.target.value})}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Place Order - {formatPrice(total)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
