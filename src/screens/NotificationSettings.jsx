import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingRow = ({ label, description, active, onToggle }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    borderRadius: '16px',
    background: 'white',
    border: '1px solid #F1F5F9',
    marginBottom: '12px'
  }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: '700', color: '#1E1B4B', fontSize: '1rem' }}>{label}</div>
      <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '4px' }}>{description}</div>
    </div>
    <div
      onClick={onToggle}
      style={{
        width: '50px',
        height: '28px',
        borderRadius: '14px',
        background: active ? '#10B981' : '#E2E8F0',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '3px',
        left: active ? '25px' : '3px',
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s'
      }} />
    </div>
  </div>
);

const NotificationSettings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("NotificationSettings mounted");
  }, []);

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('settings_notifications');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn("Using default notification settings");
    }
    return { push: true, email: true, colleges: true, roadmaps: false };
  });

  useEffect(() => {
    localStorage.setItem('settings_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="settings-detail-page" style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', background: '#F8FAFC', minHeight: '100vh' }}>
      <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          ←
        </button>
        <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-title)', fontWeight: '800', color: '#1E1B4B' }}>Notification Settings</h1>
      </header>

      <section>
        <SettingRow
          label="Push Notifications"
          description="Receive alerts directly on your device."
          active={notifications.push}
          onToggle={() => toggle('push')}
        />
        <SettingRow
          label="Email Notifications"
          description="Get key updates delivered to your inbox."
          active={notifications.email}
          onToggle={() => toggle('email')}
        />
        <SettingRow
          label="College Deadlines"
          description="Alerts for application dates and admission news."
          active={notifications.colleges}
          onToggle={() => toggle('colleges')}
        />
        <SettingRow
          label="Roadmap Progress"
          description="Notifications about your current learning path."
          active={notifications.roadmaps}
          onToggle={() => toggle('roadmaps')}
        />
      </section>
    </div>
  );
};

export default NotificationSettings;
