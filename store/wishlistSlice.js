import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const productId = action.payload.id;
      const existingIndex = state.items.findIndex(item => item.id === productId);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
