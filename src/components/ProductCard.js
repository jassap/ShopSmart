import React, { useState } from 'react';
import { calculateDiscount, getDiscountBadgeText, getDaysRemainingText } from '../utils/discountCalculator';
import ProductEditForm from './ProductEditForm';

const ProductCard = ({ product, onRemove, onEdit, isEmployeeView = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const discountInfo = calculateDiscount(product.expiryDate, product.originalPrice);

  const handleSave = (updatedProduct) => {
    onEdit(updatedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing && isEmployeeView) {
    return (
      <div className="product-card editing">
        <ProductEditForm
          product={product}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }
  
  return (
    <div className={`product-card ${discountInfo.discountCategory === 'danger' ? 'expiring-soon' : ''} ${discountInfo.daysRemaining <= 0 ? 'expired' : ''}`}>
      {discountInfo.discountPercentage > 0 && (
        <div className="discount-badge">
          {getDiscountBadgeText(discountInfo.discountPercentage)}
        </div>
      )}
      
      <h3>{product.name}</h3>
      
      <div className="product-price">
        {discountInfo.discountPercentage > 0 ? (
          <>
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            ${discountInfo.discountedPrice.toFixed(2)}
          </>
        ) : (
          `$${product.originalPrice.toFixed(2)}`
        )}
      </div>
      
      <div className="product-details">
        <div className="expiry-date">
          Expires: {new Date(product.expiryDate).toLocaleDateString()}
        </div>
        <div className={`days-remaining ${discountInfo.discountCategory}`}>
          {getDaysRemainingText(discountInfo.daysRemaining)}
        </div>
      </div>
      
      {isEmployeeView && (
        <div className="employee-actions">
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Product
          </button>
          <button 
            className="remove-btn"
            onClick={() => onRemove(product.id)}
          >
            Remove Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
