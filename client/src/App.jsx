// src/App.js
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { setAuthToken } from './api';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const handleLogin = (newToken) => {
    sessionStorage.setItem('token', newToken);
    setToken(newToken);
    setAuthToken(newToken); // Set for axios
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    setAuthToken(null);
  };

  return token ? (
    <Dashboard token={token} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
