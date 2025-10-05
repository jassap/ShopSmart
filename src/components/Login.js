import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Simple hardcoded credentials for demo purposes
  const validCredentials = {
    employee: { username: 'employee', password: 'employee123' },
    customer: { username: 'customer', password: 'customer123' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    // Check if credentials match employee
    if (credentials.username === validCredentials.employee.username && 
        credentials.password === validCredentials.employee.password) {
      onLogin('employee');
      return;
    }

    // Check if credentials match customer
    if (credentials.username === validCredentials.customer.username && 
        credentials.password === validCredentials.customer.password) {
      onLogin('customer');
      return;
    }

    // Invalid credentials
    setError('Invalid username or password');
  };

  const handleDemoLogin = (userType) => {
    if (userType === 'employee') {
      setCredentials({
        username: 'employee',
        password: 'employee123'
      });
    } else {
      setCredentials({
        username: 'customer',
        password: 'customer123'
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🛒 Product Discount Manager</h1>
          <p>Please log in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials:</h3>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="demo-btn employee"
              onClick={() => handleDemoLogin('employee')}
            >
              👨‍💼 Employee Login
            </button>
            <button 
              type="button" 
              className="demo-btn customer"
              onClick={() => handleDemoLogin('customer')}
            >
              👥 Customer Login
            </button>
          </div>
          <div className="credentials-info">
            <p><strong>Employee:</strong> username: employee, password: employee123</p>
            <p><strong>Customer:</strong> username: customer, password: customer123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

