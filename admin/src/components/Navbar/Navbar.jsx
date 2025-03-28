import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, LogOut, ChevronDown } from 'lucide-react';
import './Navbar.scss';
import { CentralGovContext } from '../../context/CentralGovContext';

const Navbar = () => {
  const {adminToken, adminName,setAdminName }=useContext(CentralGovContext)
  const navigate = useNavigate();
  const [, ] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   const name = localStorage.getItem('adminName');
  //   if (name) {
  //     setAdminName(name);
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    setAdminName("")
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Camera className="brand-icon" size={24} />
        <h1>Pixel Moments</h1>
      </div>

      <div className="nav-right">
        <div className="admin-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="avatar">
            <User size={20} />
          </div>
          <span className="admin-name">{adminName}</span>
          <ChevronDown size={16} />

          {showDropdown && adminToken && (
            <div className="dropdown-menu">
              <button className="logout-button" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;