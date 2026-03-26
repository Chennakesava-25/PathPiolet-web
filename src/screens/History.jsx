import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/apiService';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const user = JSON.parse(localStorage.getItem('user') || '{"id": 1}');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user.id) return;
      try {
        const response = await userService.getActivityHistory(user.id);
        setHistory(response.data || []);
      } catch (err) {
        console.error('Failed to fetch history', err);
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [user.id]);

  const filteredHistory = filter === 'All'
    ? history
    : history.filter(item => {
      if (!item.type) return false;
      const type = item.type.toLowerCase();
      const f = filter.toLowerCase();
      return f.includes(type) || type.includes(f);
    });

  const getIconData = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('college')) return { icon: '🏛️' };
    if (t.includes('roadmap')) return { icon: '🗺️' };
    if (t.includes('calendar') || t.includes('event')) return { icon: '📅' };
    return { icon: '📑' };
  };

  const getTypeColors = (type) => {
    if (type === 'College') return { bg: '#EEF2FF', text: '#6366F1' };
    if (type === 'Roadmap') return { bg: '#F0FDF4', text: '#10B981' };
    if (type === 'Calendar') return { bg: '#FFF7ED', text: '#F59E0B' };
    return { bg: '#F1F5F9', text: '#64748B' };
  };

  const navigateToDetails = (item) => {
    if (item.type === 'College') navigate('/colleges');
    if (item.type === 'Roadmap') navigate('/roadmap');
    if (item.type === 'Calendar') navigate('/calendar');
  };

  const handleDelete = async (e, itemId) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this from your activity?')) return;
    try {
      await userService.deleteActivityHistory(itemId, user.id);
      setHistory(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      alert('Failed to remove item.');
      console.error(err);
    }
  };

  const tabs = ['All', 'Colleges', 'Roadmaps', 'Calendar'];

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', background: '#F8FAFC', minHeight: '100vh' }}>
      <header className="glass-blue" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', padding: '24px', borderRadius: '24px', borderTop: 'none', color: 'white' }}>
        <button onClick={() => navigate(-1)} style={{
          width: '40px', height: '40px', borderRadius: '50%', border: 'none',
          background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '1.2rem', color: 'white'
        }}>←</button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>My Activity</h1>
      </header>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: '12px 24px', borderRadius: '24px', border: 'none',
              background: filter === t ? '#1E3A8A' : '#EFF6FF',
              color: filter === t ? 'white' : '#1E3A8A',
              fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s',
              whiteSpace: 'nowrap'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {isLoading ? (
          <p style={{ textAlign: 'center', color: '#64748B', marginTop: '40px' }}>Loading activity...</p>
        ) : filteredHistory.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
              {filter === 'Colleges' ? '🏛️' : filter === 'Roadmaps' ? '🗺️' : filter === 'Calendar' ? '📅' : '📋'}
            </div>
            <p style={{ color: '#64748B', fontSize: '1rem', fontWeight: '500' }}>
              {filter === 'All' ? 'No saved items yet.' : `No saved ${filter.toLowerCase()} yet.`}
            </p>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '8px' }}>
              {filter === 'Colleges' ? 'Save colleges to see them here.' :
                filter === 'Roadmaps' ? 'Save roadmaps to see them here.' :
                  filter === 'Calendar' ? 'Add events to see them here.' :
                    'Save colleges, roadmaps, or add events to see them here.'}
            </p>
          </div>
        ) : (
          filteredHistory.map((item, idx) => {
            const { icon } = getIconData(item.type);
            const { bg, text } = getTypeColors(item.type);
            return (
              <div key={item.id || idx}
                onClick={() => navigateToDetails(item)}
                style={{
                  background: 'white', padding: '16px', borderRadius: '20px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)', cursor: 'pointer',
                  position: 'relative', border: '1px solid #F1F5F9'
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  background: bg, color: text,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ color: '#1E1B4B', fontSize: '1rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{item.title}</h4>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8', flexShrink: 0, marginLeft: '8px' }}>{item.time}</span>
                  </div>
                  <p style={{ color: '#64748B', fontSize: '0.8rem' }}>{item.subtitle}</p>
                  <span style={{
                    display: 'inline-block', marginTop: '6px', padding: '2px 10px',
                    borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600',
                    background: bg, color: text
                  }}>{item.type}</span>
                </div>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  style={{
                    background: 'none', border: 'none', color: '#EF4444',
                    cursor: 'pointer', padding: '8px', zIndex: 2, flexShrink: 0
                  }}
                >🗑️</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default History;
