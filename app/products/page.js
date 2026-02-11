'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/common/ProductCard';
import {
  setCategory,
  setBrand,
  setPriceRange,
  setRating,
  setSearchQuery,
  setSortBy,
  resetFilters,
} from '@/store/filtersSlice';
import { filterProducts, sortProducts, debounce } from '@/utils/helpers';
import { categories, brands } from '@/data/categories';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Load products
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Apply URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      dispatch(setCategory(category));
    }
  }, [searchParams, dispatch]);

  // Filter and sort products
  useEffect(() => {
    let result = filterProducts(allProducts, filters);
    result = sortProducts(result, filters.sortBy);
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [allProducts, filters]);

  // Debounced search
  const handleSearch = debounce((value) => {
    dispatch(setSearchQuery(value));
  }, 300);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-semibold mb-2">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => dispatch(setBrand(e.target.value))}
          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="2000"
            value={filters.priceRange[1]}
            onChange={(e) => dispatch(setPriceRange([0, parseInt(e.target.value)]))}
            className="w-full accent-red-600"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-semibold mb-2">Minimum Rating</label>
        <select
          value={filters.rating}
          onChange={(e) => dispatch(setRating(parseFloat(e.target.value)))}
          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="0">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="4.5">4.5★ & above</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={() => dispatch(resetFilters())}
        className="w-full btn-secondary"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            All Products
          </h1>
          <p className="text-neutral-600">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden btn-secondary flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <div className="card p-6 sticky top-24">
            <h3 className="font-display text-xl font-bold mb-6">Filters</h3>
            <FilterSection />
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterSection />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="card overflow-hidden">
                  <div className="aspect-square bg-neutral-200 skeleton"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded skeleton"></div>
                    <div className="h-6 bg-neutral-200 rounded skeleton"></div>
                    <div className="h-4 bg-neutral-200 rounded skeleton"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-neutral-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-red-600 text-white'
                          : 'border border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-neutral-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-neutral-600 text-lg">No products found</p>
              <button
                onClick={() => dispatch(resetFilters())}
                className="btn-primary mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
