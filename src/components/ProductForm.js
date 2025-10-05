import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    originalPrice: '',
    expiryDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.originalPrice || !formData.expiryDate) {
      alert('Please fill in all fields');
      return;
    }

    const price = parseFloat(formData.originalPrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const product = {
      id: Date.now(),
      name: formData.name,
      originalPrice: price,
      expiryDate: formData.expiryDate
    };

    onAddProduct(product);
    setFormData({
      name: '',
      originalPrice: '',
      expiryDate: ''
    });
  };

  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="originalPrice">Original Price ($)</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

