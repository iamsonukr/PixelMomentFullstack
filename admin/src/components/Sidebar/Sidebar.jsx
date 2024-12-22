// src/components/Sidebar/Sidebar.jsx
import { useState } from 'react';
import './Sidebar.scss';
import { 
  Home,
  Camera,
  Video,
  ShoppingCart,
  Users,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/dashboard' },
    { title: 'Photo Orders', icon: Camera, path: '/photo-orders' },
    { title: 'Video Orders', icon: Video, path: '/video-orders' },
    { title: 'All Orders', icon: ShoppingCart, path: '/orders' },
    { title: 'Customers', icon: Users, path: '/customers' },
    { title: 'Bookings', icon: Calendar, path: '/bookings' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </div>

      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <item.icon size={20} />
            {!isCollapsed && <span>{item.title}</span>}
            {isCollapsed && <div className="tooltip">{item.title}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;