import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './SubComponenets/Sidebar/Sidebar';
import OrdersDashboard from './components/Orders/OrdersDashboard';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import Footer from './components/Footer/Footer';
import LoginPage from './components/LoginPage/LoginPage';
import PhotoLoader from './SubComponenets/Loader/PhotoLoader';
import Customers from './components/Customers/Customers';

import './App.scss';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className='main-page'>
      <ToastContainer />
      
      <div className="main-navbar">
        <Navbar />
      </div>

      <div 
        className="dashboard-sidebar" 
        style={{ 
          display: 'flex', 
          // Hide sidebar container when on login page
          ...(isLoginPage && { display: 'block' }) 
        }}
      >
        {!isLoginPage && (
          <div 
            className="sidebar" 
            style={{ 
              width: isCollapsed ? "80px" : "300px",
              transition: "width 0.3s ease"
            }}
          >
            <Sidebar 
              isCollapsed={isCollapsed} 
              setIsCollapsed={setIsCollapsed}
            />
          </div>
        )}

        <div className="dashboard">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/bookings" element={<OrdersDashboard />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/loader" element={<PhotoLoader />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;