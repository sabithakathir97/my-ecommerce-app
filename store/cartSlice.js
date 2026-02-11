import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
    promoCode: null,
    discount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedColor, selectedSize } = action.payload;
      const existingItem = state.items.find(
        item => 
          item.id === product.id && 
          item.selectedColor === selectedColor && 
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
          selectedColor,
          selectedSize,
          cartItemId: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
        });
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find(item => item.cartItemId === cartItemId);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    applyPromoCode: (state, action) => {
      const code = action.payload.toUpperCase();
      // Fake promo codes
      const promoCodes = {
        'SAVE10': 10,
        'SAVE20': 20,
        'WELCOME': 15,
      };
      
      if (promoCodes[code]) {
        state.promoCode = code;
        state.discount = promoCodes[code];
      }
    },
    removePromoCode: (state) => {
      state.promoCode = null;
      state.discount = 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discount = 0;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  applyPromoCode, 
  removePromoCode,
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
