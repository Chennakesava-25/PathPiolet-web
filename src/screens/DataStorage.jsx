import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DataStorage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("DataStorage mounted");
  }, []);

  const [offlineData, setOfflineData] = useState(false);
  const [cacheSize, setCacheSize] = useState('42.5 MB');

  const handleClearCache = () => {
    try {
      if (window.confirm('Are you sure you want to clear the app cache? This will not delete your saved colleges.')) {
        setCacheSize('0.0 MB');
        alert('Cache cleared successfully!');
      }
    } catch (e) {
      console.warn("Error handling clear cache");
    }
  };

  return (
    <div className="settings-detail-page" style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', background: '#F8FAFC', minHeight: '100vh' }}>
      <header style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          ←
        </button>
        <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-title)', fontWeight: '800', color: '#1E1B4B' }}>Data & Storage</h1>
      </header>

      <section className="glass" style={{ padding: '24px', borderRadius: '24px', background: 'white', border: '1px solid #F1F5F9', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px', fontWeight: '800' }}>Storage Usage</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: '#475569', fontWeight: '600' }}>App Cache</span>
          <span style={{ color: '#1E1B4B', fontWeight: '800' }}>{cacheSize}</span>
        </div>
        <button
          onClick={handleClearCache}
          style={{ padding: '10px 20px', borderRadius: '12px', border: '1.5px solid #EF4444', color: '#EF4444', background: 'white', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}
        >
          Clear Cache
        </button>
      </section>

      <section>
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
            <div style={{ fontWeight: '700', color: '#1E1B4B', fontSize: '1rem' }}>Download via Mobile Data</div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '4px' }}>Allow downloading roadmaps when not on Wi-Fi.</div>
          </div>
          <div
            onClick={() => setOfflineData(!offlineData)}
            style={{
              width: '50px',
              height: '28px',
              borderRadius: '14px',
              background: offlineData ? '#3B82F6' : '#E2E8F0',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '3px',
              left: offlineData ? '25px' : '3px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }} />
          </div>
        </div>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', fontWeight: '800' }}>Download History</h3>
        <div style={{ padding: '24px', borderRadius: '16px', border: '1.5px dashed #CBD5E1', textAlign: 'center', color: '#94A3B8' }}>
          No offline roadmaps found.
        </div>
      </section>
    </div>
  );
};

export default DataStorage;
