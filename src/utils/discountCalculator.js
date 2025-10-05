// Utility functions for calculating discounts based on expiry dates

export const calculateDiscount = (expiryDate, originalPrice) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  let discountPercentage = 0;
  let discountCategory = 'safe';
  
  if (daysRemaining <= 0) {
    // Expired - 50% discount
    discountPercentage = 50;
    discountCategory = 'expired';
  } else if (daysRemaining <= 1) {
    // 1 day or less - 40% discount
    discountPercentage = 40;
    discountCategory = 'danger';
  } else if (daysRemaining <= 3) {
    // 2-3 days - 30% discount
    discountPercentage = 30;
    discountCategory = 'danger';
  } else if (daysRemaining <= 7) {
    // 4-7 days - 20% discount
    discountPercentage = 20;
    discountCategory = 'warning';
  } else if (daysRemaining <= 14) {
    // 8-14 days - 10% discount
    discountPercentage = 10;
    discountCategory = 'warning';
  } else {
    // More than 14 days - no discount
    discountPercentage = 0;
    discountCategory = 'safe';
  }
  
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  
  return {
    discountPercentage,
    discountAmount,
    discountedPrice,
    daysRemaining,
    discountCategory
  };
};

export const getDiscountBadgeText = (discountPercentage) => {
  if (discountPercentage === 0) return '';
  return `${discountPercentage}% OFF`;
};

export const getDaysRemainingText = (daysRemaining) => {
  if (daysRemaining <= 0) return 'EXPIRED';
  if (daysRemaining === 1) return '1 day left';
  return `${daysRemaining} days left`;
};
