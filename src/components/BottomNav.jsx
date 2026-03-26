import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const navItems = [
    { label: 'Home', icon: '🏠', path: '/home' },
    { label: 'Colleges', icon: '🏫', path: '/colleges' },
    { label: 'Roadmap', icon: '🗺️', path: '/roadmap' },
    { label: 'Calendar', icon: '📅', path: '/calendar', badge: 13 },
    { label: 'Profile', icon: '👤', path: '/profile' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div style={{ position: 'relative' }}>
            <span className="nav-item-icon">{item.icon}</span>
            {item.badge && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#F1F5F9',
                color: '#64748B',
                fontSize: '10px',
                padding: '2px 4px',
                borderRadius: '6px',
                fontWeight: '700'
              }}>{item.badge}</span>
            )}
          </div>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
