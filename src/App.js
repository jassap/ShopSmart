import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import EmployeeView from './components/EmployeeView';
import CustomerView from './components/CustomerView';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('userAuth');
    if (savedAuth) {
      const { isAuth, type } = JSON.parse(savedAuth);
      setIsAuthenticated(isAuth);
      setUserType(type);
    }
  }, []);

  const handleLogin = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    // Save authentication state to localStorage
    localStorage.setItem('userAuth', JSON.stringify({
      isAuth: true,
      type: type
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    // Clear authentication state from localStorage
    localStorage.removeItem('userAuth');
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>🛒 Product Discount Manager</h1>
              <p>Welcome, {userType === 'employee' ? 'Employee' : 'Customer'}!</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main>
          {userType === 'employee' ? <EmployeeView /> : <CustomerView />}
        </main>
      </div>
    </div>
  );
}

export default App;
