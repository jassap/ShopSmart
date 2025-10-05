# Product Discount Manager

A React-based web application that manages product discounts based on expiry dates. The application has two main views: Employee View for managing products and Customer View for browsing products with automatic discounts.

## Features

### Employee View
- Add new products with name, price, and expiry date
- Remove existing products
- View all products with discount information
- Real-time discount calculations

### Customer View
- Browse all available products
- See original prices and discounted prices
- Sort products by name, price, or expiry date
- Visual indicators for products expiring soon

### Discount System
- **Expired products**: 50% discount
- **1 day or less**: 40% discount
- **2-3 days**: 30% discount
- **4-7 days**: 20% discount
- **8-14 days**: 10% discount
- **More than 14 days**: No discount

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and go to `http://localhost:3000`

## Usage

### For Employees
1. Click on "Employee View" button
2. Fill out the product form with:
   - Product name
   - Original price
   - Expiry date
3. Click "Add Product" to add it to the system
4. Use "Remove Product" button to delete products

### For Customers
1. Click on "Customer View" button
2. Browse available products
3. Use the sort dropdown to organize products
4. See discounted prices and expiry information

## Technical Details

- **Frontend**: React 18
- **Styling**: CSS3 with responsive design
- **Data Storage**: Local Storage (browser-based)
- **Components**: Functional components with hooks

## File Structure

```
src/
├── components/
│   ├── ProductForm.js      # Form for adding products
│   ├── ProductCard.js      # Individual product display
│   ├── EmployeeView.js     # Employee interface
│   └── CustomerView.js     # Customer interface
├── utils/
│   └── discountCalculator.js # Discount calculation logic
├── App.js                  # Main application component
├── App.css                 # Application styles
├── index.js               # Entry point
└── index.css              # Global styles
```

## Customization

You can easily modify the discount percentages and time ranges by editing the `calculateDiscount` function in `src/utils/discountCalculator.js`.

