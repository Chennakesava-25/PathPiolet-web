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
        background: active ? '#1E3A8A' : '#E2E8F0',
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

const AccountPrivacy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AccountPrivacy mounted");
  }, []);

  const [privacy, setPrivacy] = useState(() => {
    try {
      const saved = localStorage.getItem('settings_privacy');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn("Using default privacy settings");
    }
    return { privateAccount: false, hideHistory: false, searchVisibility: true };
  });

  useEffect(() => {
    localStorage.setItem('settings_privacy', JSON.stringify(privacy));
  }, [privacy]);

  const toggle = (key) => setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="settings-detail-page" style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', background: '#F8FAFC', minHeight: '100vh' }}>
      <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          ←
        </button>
        <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-title)', fontWeight: '800', color: '#1E1B4B' }}>Account Privacy</h1>
      </header>

      <section>
        <SettingRow
          label="Private Account"
          description="Only your connections can see your profile and saved colleges."
          active={privacy.privateAccount}
          onToggle={() => toggle('privateAccount')}
        />
        <SettingRow
          label="Hide Activity History"
          description="Do not show your activity history on your public profile."
          active={privacy.hideHistory}
          onToggle={() => toggle('hideHistory')}
        />
        <SettingRow
          label="Search Visibility"
          description="Allow search engines to index your public profile."
          active={privacy.searchVisibility}
          onToggle={() => toggle('searchVisibility')}
        />
      </section>

      <section style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', fontWeight: '800' }}>Data Management</h3>
        <button
          onClick={() => alert('Data export initiated. You will receive an email shortly.')}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: 'white',
            border: '1.5px solid #E2E8F0',
            color: '#1E3A8A',
            fontWeight: '700',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <span>Export Personal Data</span>
          <span style={{ fontSize: '1.2rem' }}>📥</span>
        </button>
      </section>
    </div>
  );
};

export default AccountPrivacy;
