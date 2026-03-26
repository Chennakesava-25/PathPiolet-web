import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    { title: 'Change Password', icon: '🔑', description: 'Update your login credentials', path: '/settings/change-password' },
    { title: 'Notification Settings', icon: '🔔', description: 'Manage your alerts and notifications', path: '/settings/notifications' },
  ];

  return (
    <div className="settings-page" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '40px', padding: '30px', borderRadius: '24px', borderTop: 'none', color: 'white' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', color: 'white', fontWeight: '600', marginBottom: '12px', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.8 }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Settings</h1>
      </header>

      <div style={{ display: 'grid', gap: '24px' }}>
        <section className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>General</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {settingsOptions.map((opt, idx) => (
              <Link
                key={idx}
                to={opt.path}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'white',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div style={{
                  fontSize: '28px',
                  width: '56px',
                  height: '56px',
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {opt.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E1B4B' }}>{opt.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{opt.description}</div>
                </div>
                <div style={{ color: '#CBD5E1', fontSize: '1.5rem' }}>›</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="glass" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#B91C1C' }}>Danger Zone</h3>
          <button style={{
            width: '100%',
            padding: '20px',
            borderRadius: '16px',
            border: '1.5px solid #FCA5A5',
            background: 'white',
            color: '#B91C1C',
            fontWeight: '700',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}>
            <span>Delete Account</span>
            <span>🗑️</span>
          </button>
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#7F1D1D', opacity: 0.7 }}>
            Once you delete your account, there is no going back. Please be certain.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Settings;
