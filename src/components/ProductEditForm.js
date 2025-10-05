import React, { useState, useEffect } from 'react';

const ProductEditForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    originalPrice: product.originalPrice.toString(),
    expiryDate: product.expiryDate
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: product.name,
      originalPrice: product.originalPrice.toString(),
      expiryDate: product.expiryDate
    });
    setErrors({});
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.originalPrice || isNaN(parseFloat(formData.originalPrice)) || parseFloat(formData.originalPrice) <= 0) {
      newErrors.originalPrice = 'Please enter a valid price';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const selectedDate = new Date(formData.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.expiryDate = 'Expiry date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedProduct = {
        ...product,
        name: formData.name.trim(),
        originalPrice: parseFloat(formData.originalPrice),
        expiryDate: formData.expiryDate
      };
      
      onSave(updatedProduct);
    }
  };

  return (
    <div className="product-edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-name">Product Name</label>
          <input
            type="text"
            id="edit-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-price">Original Price ($)</label>
            <input
              type="number"
              id="edit-price"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={errors.originalPrice ? 'error' : ''}
            />
            {errors.originalPrice && <span className="error-text">{errors.originalPrice}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-expiry">Expiry Date</label>
            <input
              type="date"
              id="edit-expiry"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={errors.expiryDate ? 'error' : ''}
            />
            {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditForm;

