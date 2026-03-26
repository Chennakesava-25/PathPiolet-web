import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/apiService';

const Home = () => {
  const user = useMemo(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn("Home: Error parsing user data", e);
    }
    return { username: 'Student' };
  }, []);

  const [careers, setCareers] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [careersRes, roadmapRes] = await Promise.all([
          contentService.getCareers(),
          contentService.getRoadmap()
        ]);
        setCareers(careersRes.data);
        setRoadmap(roadmapRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page" style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <header className="glass-blue" style={{
        padding: '30px 24px',
        color: 'white',
        borderRadius: '0 0 24px 24px',
        marginBottom: '24px',
        borderTop: 'none'
      }}>
        {/* Header Top Row: Name and Avatar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Welcome, {user.username}! 👋</h1>
            <p style={{ fontSize: '1.05rem', fontWeight: '500', opacity: '0.9', marginTop: '4px' }}>
              Your CS Career Roadmap Starts Here
            </p>
          </div>
          <div
            onClick={() => navigate('/profile')}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: 'pointer',
              overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            {user.profile_picture ? (
              <img
                src={user.profile_picture.startsWith('http') ? user.profile_picture : `http://localhost:5001${user.profile_picture}`}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              user.username?.charAt(0).toUpperCase() || 'S'
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          {[
            { label: 'Colleges', value: '1500+' },
            { label: 'Pathways', value: '5' },
            { label: 'Powered', value: 'AI' },
          ].map((stat, idx) => (
            <div key={idx} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.15)',
              padding: '16px 8px',
              borderRadius: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: '0.8', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tip of the Day */}
        <div style={{
          marginTop: '24px',
          background: 'rgba(255,255,255,0.1)',
          padding: '16px 20px',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ fontSize: '1.5rem' }}>💡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px' }}>Tip of the Day</div>
            <p style={{ fontSize: '0.8rem', opacity: '0.9', lineHeight: '1.3' }}>
              Research college placement records before applying — they reveal real career outcomes.
            </p>
          </div>
        </div>
      </header>

      <main style={{ padding: '0 40px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Quick Actions */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="glass" style={{ padding: '32px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>AI College Finder</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Get personalized college matches based on your scores and location.</p>
            <button className="btn-primary" onClick={() => navigate('/ai-finder')}>Small Start →</button>
            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '100px', opacity: '0.1' }}>🔮</div>
          </div>

          <div className="glass" style={{ padding: '32px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Career Roadmap</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Step-by-step guide to becoming a successful Software Engineer.</p>
            <button className="btn-primary" style={{ background: 'var(--secondary)' }} onClick={() => navigate('/roadmap')}>Explore →</button>
            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '100px', opacity: '0.1' }}>🗺️</div>
          </div>
        </section>

        {/* Career Options List */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.8rem' }}>CS Career Options</h2>
            <button style={{ color: 'var(--primary)', fontWeight: '600' }} onClick={() => navigate('/career-paths')}>View All</button>
          </div>

          {isLoading ? (
            <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading career options...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="glass"
                  onClick={() => navigate('/career-paths')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img src={career.image_url || 'https://via.placeholder.com/300x150'} alt={career.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ marginBottom: '8px', fontSize: '1.1rem', color: '#1E1B4B' }}>{career.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {career.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
