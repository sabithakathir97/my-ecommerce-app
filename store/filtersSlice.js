import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    category: '',
    brand: '',
    priceRange: [0, 2000],
    rating: 0,
    searchQuery: '',
    sortBy: 'relevance',
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.category = '';
      state.brand = '';
      state.priceRange = [0, 2000];
      state.rating = 0;
      state.searchQuery = '';
      state.sortBy = 'relevance';
    },
  },
});

export const {
  setCategory,
  setBrand,
  setPriceRange,
  setRating,
  setSearchQuery,
  setSortBy,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
