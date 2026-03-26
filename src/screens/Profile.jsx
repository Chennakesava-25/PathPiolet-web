import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn("Profile: Error parsing user data", e);
    }
    return { username: 'Student' };
  });

  React.useEffect(() => {
    const fetchLatestProfile = async () => {
      if (!user.id) return;
      try {
        const response = await fetch(`http://localhost:5001/api/auth/profile/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch latest profile:", err);
      }
    };
    fetchLatestProfile();
  }, []);

  const menuItems = [
    { title: 'Edit profile', icon: '🖊️', path: '/profile/edit', color: '#EEF2FF' },
    { title: 'My activity', icon: '📈', path: '/history', color: '#EEF2FF' },
    { title: 'About Us', icon: 'ℹ️', path: '/about', color: '#EEF2FF' },
    { title: 'Contact Us', icon: '📞', path: '/contact', color: '#EEF2FF' },
    { title: 'Settings', icon: '⚙️', path: '/settings', color: '#EEF2FF' },
    { title: 'Logout', icon: '🚪', path: '/logout', color: '#FEF2F2', isLogout: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="brand-text-profile">PathPoilet</div>

      <div className="profile-header-info">
        <div className="avatar-initial-box">
          {user.profile_picture ? (
            <img
              src={user.profile_picture.startsWith('http') ? user.profile_picture : `http://localhost:5000${user.profile_picture}`}
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
            user.username?.charAt(0).toUpperCase() || 'S'
          )}
        </div>
        <h1 className="profile-main-name">{user.username}</h1>
        <p className="profile-sub-title">Class 12th Student</p>
      </div>

      <div className="menu-list-container">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="menu-item-row"
            onClick={() => item.isLogout ? handleLogout() : navigate(item.path)}
          >
            <div className="menu-item-row-left">
              <div className="menu-icon-wrapper" style={{ background: item.color }}>
                <span style={{
                  color: item.isLogout ? '#EF4444' : '#6366F1',
                  fontSize: '1.2rem'
                }}>{item.icon}</span>
              </div>
              <span className={`menu-text-label ${item.isLogout ? 'logout-text-label' : ''}`}>
                {item.title}
              </span>
            </div>
            <div className="menu-item-chevron">
              <span style={{ transform: 'scale(1.5)', display: 'inline-block' }}>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
