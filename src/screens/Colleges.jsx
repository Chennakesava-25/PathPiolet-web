import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/apiService';

const Colleges = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await contentService.getColleges();
        setColleges(response.data);
      } catch (err) {
        console.error('Error fetching colleges:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter(college => {
    const nameMatch = (college.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const cityMatch = (college.city || '').toLowerCase().includes(searchTerm.toLowerCase());
    const stateMatch = (college.state || '').toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || cityMatch || stateMatch;
  });

  return (
    <div className="colleges-page" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '40px', padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', borderTop: 'none', color: 'white' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginBottom: '8px' }}>Top Colleges</h1>
          <p style={{ color: 'var(--text-muted)' }}>Explore premier engineering and technical institutions</p>
        </div>

        <div className="search-box" style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '14px 20px', borderRadius: '16px' }}
          />
        </div>
      </header>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="colleges-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredColleges.map((college, idx) => (
            <div key={idx} className="glass" style={{
              borderRadius: '24px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              animation: `fadeIn 0.5s ease forwards ${idx * 0.05}s`,
              opacity: 0
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                height: '180px',
                background: college.background_image ? `url(${college.background_image}) center/cover` : `url(https://source.unsplash.com/400x300/?college,${college.name}) center/cover`,
                position: 'relative',
                backgroundColor: '#b0b5e8', // Fallback color
              }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: 'var(--primary)'
                }}>
                  {college.type || (college.tags && college.tags.length > 0 ? college.tags[0] : 'College')}
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{college.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  📍 {college.city}, {college.state}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>Fees: </span>
                    {college.fees || 'N/A'}
                  </div>
                  <button
                    onClick={() => navigate(`/colleges/${college.id}`)}
                    style={{
                      color: 'var(--primary)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}>View Details →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredColleges.length === 0 && !isLoading && (
        <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏘️</div>
          <h3>No colleges found matching your search</h3>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Colleges;
