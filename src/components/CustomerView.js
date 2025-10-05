import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const CustomerView = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    searchTerm: '',
    priceRange: 'all',
    expiryFilter: 'all'
  });

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = [...products]
    .filter(product => {
      // Search filter
      if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (filters.priceRange !== 'all') {
        const price = product.originalPrice;
        switch (filters.priceRange) {
          case 'under-10':
            if (price >= 10) return false;
            break;
          case '10-25':
            if (price < 10 || price > 25) return false;
            break;
          case '25-50':
            if (price < 25 || price > 50) return false;
            break;
          case 'over-50':
            if (price <= 50) return false;
            break;
        }
      }

      // Expiry filter
      if (filters.expiryFilter !== 'all') {
        const today = new Date();
        const expiry = new Date(product.expiryDate);
        const timeDiff = expiry.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        switch (filters.expiryFilter) {
          case 'expired':
            if (daysRemaining > 0) return false;
            break;
          case 'expiring-today':
            if (daysRemaining !== 0) return false;
            break;
          case 'expiring-week':
            if (daysRemaining <= 0 || daysRemaining > 7) return false;
            break;
          case 'expiring-month':
            if (daysRemaining <= 0 || daysRemaining > 30) return false;
            break;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.originalPrice - b.originalPrice;
        case 'price-high':
          return b.originalPrice - a.originalPrice;
        case 'expiry':
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        default:
          return 0;
      }
    });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      priceRange: 'all',
      expiryFilter: 'all'
    });
  };

  return (
    <div>
      <div className="products-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Available Products ({filteredAndSortedProducts.length} of {products.length})</h2>
          
          <div className="form-group" style={{ margin: 0, width: '200px' }}>
            <label htmlFor="sortBy">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="expiry">Expiry Date</option>
            </select>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filters-section">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="searchTerm">Search by name:</label>
              <input
                type="text"
                id="searchTerm"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                placeholder="Enter product name..."
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="priceRange">Price Range:</label>
              <select
                id="priceRange"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Prices</option>
                <option value="under-10">Under $10</option>
                <option value="10-25">$10 - $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="over-50">Over $50</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="expiryFilter">Expiry Status:</label>
              <select
                id="expiryFilter"
                value={filters.expiryFilter}
                onChange={(e) => handleFilterChange('expiryFilter', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Items</option>
                <option value="expired">Expired</option>
                <option value="expiring-today">Expiring Today</option>
                <option value="expiring-week">Expiring This Week</option>
                <option value="expiring-month">Expiring This Month</option>
              </select>
            </div>

            <button 
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {products.length === 0 ? (
          <div className="empty-state">
            <h3>No products available</h3>
            <p>Check back later for new products and discounts!</p>
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products match your filters</h3>
            <p>Try adjusting your search criteria or clear filters to see all products.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isEmployeeView={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerView;
