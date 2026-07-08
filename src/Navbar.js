import React from 'react';
import './Navbar.css';
import { Bell, Sun, Moon, User } from 'lucide-react';

function Navbar({ isDarkMode, toggleTheme, notificationCount }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">محمد صلاح</span>
            <span className="user-role">مدير النظام</span>
          </div>
          <div className="user-avatar">
            <User size={20} color="#121212" />
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <button className="nav-icon-btn" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="nav-icon-btn notification-btn">
          <Bell size={20} />
          {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Navbar;