import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BriefcaseBusiness,
  Video,
  ShoppingCart,
  Calendar,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './Sidebar.scss'

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  
  const menuItems = [
    { title: 'Bookings', icon: Calendar, path: '/bookings' },
    // { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Employees', icon: BriefcaseBusiness, path: '/employee' },
    // { title: 'Video Orders', icon: Video, path: '/video-orders' },
    // { title: 'All Orders', icon: ShoppingCart, path: '/orders' },
    { title: 'Customers', icon: Users, path: '/customers' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="collapse-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <nav className="menu-items">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="menu-title">{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;