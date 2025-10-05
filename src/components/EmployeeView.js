import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductCard from './ProductCard';

const EmployeeView = () => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleRemoveProduct = (productId) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(prev => prev.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  return (
    <div>
      <ProductForm onAddProduct={handleAddProduct} />
      
      <div className="products-section">
        <h2>Manage Products ({products.length} total)</h2>
        
        {products.length === 0 ? (
          <div className="empty-state">
            <h3>No products added yet</h3>
            <p>Add your first product using the form above</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onRemove={handleRemoveProduct}
                onEdit={handleEditProduct}
                isEmployeeView={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeView;
