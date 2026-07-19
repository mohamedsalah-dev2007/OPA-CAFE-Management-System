import React from 'react';
import './Sidebar.css';
import { LayoutDashboard, Users, Coffee, ClipboardList, Settings, LogOut } from 'lucide-react';

function Sidebar({ currentTab, setCurrentTab }) {
  
 
  const handleLogout = () => {
    
    window.location.href = '/';
  };

  const menuItems = [
    { id: 'dashboard', text: 'لوحة التحكم', icon: <LayoutDashboard size={20} /> },
    { id: 'orders', text: 'الطلبات', icon: <ClipboardList size={20} /> },
    { id: 'menu', text: 'المنيو', icon: <Coffee size={20} /> },
    { id: 'customers', text: 'العملاء', icon: <Users size={20} /> },
    { id: 'settings', text: 'الإعدادات', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>OPA CAFE</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${currentTab === item.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(item.id)}
          >
            <span className="item-text">{item.text}</span>
            <span className="item-icon">{item.icon}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button 
          className="logout-btn" 
          onClick={handleLogout} 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: '#ff4757',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          <span>تسجيل الخروج</span>
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;