import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import CustomerDashboard from './components/CustomerDashboard';
import BankerDashboard from './components/BankerDashboard';
import NavBar from './components/Navbar';

function App() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const showNavBar = !['/login', '/register'].includes(location.pathname);


  return (
    <div className="min-h-screen bg-gray-100">
      {showNavBar && <NavBar />}
      <Routes>
      <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : user.role === 'customer' ? (
              <CustomerDashboard />
            ) : (
              <BankerDashboard />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
