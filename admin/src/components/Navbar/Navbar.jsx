// src/components/Navbar/Navbar.jsx
import { Bell, Search, User } from 'lucide-react';
import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>PixelMoments</h2>
        <span>Admin Dashboard</span>
      </div>

      <div className="navbar-search">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search orders..." />
        </div>
      </div>

      <div className="navbar-actions">
        <div className="notification-wrapper">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </div>
        <div className="divider"></div>
        <div className="admin-profile">
          <div className="admin-info">
            <p className="admin-name">John Doe</p>
            <span className="admin-role">Admin</span>
          </div>
          <div className="admin-avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;