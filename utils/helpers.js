export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const calculateDiscount = (price, discountPercentage) => {
  return price - (price * discountPercentage) / 100;
};

export const getProductRating = (rating) => {
  return Math.round(rating * 10) / 10;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    const { category, brand, priceRange, rating, searchQuery } = filters;

    // Category filter
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // Brand filter
    if (brand && product.brand.toLowerCase() !== brand.toLowerCase()) {
      return false;
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Rating filter
    if (product.rating < rating) {
      return false;
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = product.title.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      const matchesBrand = product.brand.toLowerCase().includes(query);
      
      if (!matchesTitle && !matchesDescription && !matchesBrand) {
        return false;
      }
    }

    return true;
  });
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};
