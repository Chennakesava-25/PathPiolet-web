import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { contentService } from '../services/apiService';

const AiFinder = () => {
  const [prefs, setPrefs] = useState({
    location: '',
    budget: 500000,
    collegeTypes: [],
    hostel: false,
    placementPriority: 'Medium',
    campusSize: '',
    specializations: []
  });
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // isSearching state remains, but handleSearch no longer sets it
  const navigate = useNavigate();
  const location = useLocation(); // Added useLocation hook

  const handleSearch = () => {
    // Map frontend prefs to backend expected keys
    const backendPrefs = {
      location: prefs.location,
      budgetRange: prefs.budget < 100000 ? "Low" : (prefs.budget <= 300000 ? "Medium" : "High"),
      collegeType: prefs.collegeTypes.length > 0 ? prefs.collegeTypes[0] : 'Private',
      specializations: ['Computer Science'], // Default for now
      hostel: prefs.hostel ? 'yes' : 'no',
      avgPackageLpa: prefs.placementPriority === 'High' ? 10 : (prefs.placementPriority === 'Medium' ? 5 : 3),
      campusSize: prefs.campusSize,
      entranceExam: ''
    };
    navigate('/ai-processing', { state: { prefs: backendPrefs } });
  };

  useEffect(() => { // Added useEffect to handle incoming results
    if (location.state?.results) {
      setResults(location.state.results);
      // Optionally clear the state from location to prevent re-processing on subsequent renders
      // navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]); // Added navigate to dependency array for completeness

  const toggleType = (type) => {
    const newTypes = prefs.collegeTypes.includes(type)
      ? prefs.collegeTypes.filter(t => t !== type)
      : [...prefs.collegeTypes, type];
    setPrefs({ ...prefs, collegeTypes: newTypes });
  };

  return (
    <div className="ai-finder-page" style={{ minHeight: '100vh', padding: '40px' }}>
      <header className="glass-blue" style={{ maxWidth: '1200px', margin: '0 auto 40px', padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: 'none', color: 'white' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>AI College Finder</h1>
          <p style={{ color: 'var(--text-muted)' }}>Get personalized engineering college recommendations</p>
        </div>
        <div style={{ fontSize: '48px' }}>🔮</div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }}>
        {/* Preferences Sidebar */}
        <aside className="glass" style={{ padding: '32px', borderRadius: '24px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '24px' }}>Your Preferences</h3>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Preferred Location</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Chennai, Bangalore"
              value={prefs.location}
              onChange={(e) => setPrefs({ ...prefs, location: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Max Budget (per year): ₹{prefs.budget.toLocaleString()}</label>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="50000"
              style={{ width: '100%', accentColor: 'var(--primary)' }}
              value={prefs.budget}
              onChange={(e) => setPrefs({ ...prefs, budget: parseInt(e.target.value) })}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>College Types</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Government', 'Private', 'Autonomous'].map(type => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    background: prefs.collegeTypes.includes(type) ? 'var(--primary)' : 'white',
                    color: prefs.collegeTypes.includes(type) ? 'white' : 'var(--text-main)',
                    border: `1px solid ${prefs.collegeTypes.includes(type) ? 'var(--primary)' : 'var(--border)'}`
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={prefs.hostel}
                onChange={(e) => setPrefs({ ...prefs, hostel: e.target.checked })}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontWeight: '500' }}>Need Hostel Facility</span>
            </label>
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%', padding: '16px' }}
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? 'Finding matches...' : 'Find Colleges ✨'}
          </button>
        </aside>

        {/* Results Area */}
        <section>
          {results.length === 0 ? (
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: '60px'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔎</div>
              <h3>Adjust your preferences and click search</h3>
              <p>We'll find the best Indian engineering colleges for you.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {results.map((college, idx) => (
                <div key={idx} className="glass"
                  onClick={() => navigate(`/colleges/${college.id}`)}
                  style={{
                    padding: '24px',
                    borderRadius: '24px',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    animation: `fadeIn 0.5s ease forwards ${idx * 0.1}s`,
                    opacity: 0,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    flexShrink: 0
                  }}>🏛️</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.25rem' }}>{college.name}</h4>
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--accent)',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '700'
                      }}>Match: {college.match_score || college.matchScore}%</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>📍 {college.location || 'India'}</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '0.85rem', background: '#F1F5F9', padding: '4px 8px', borderRadius: '6px' }}>💰 {college.fees}</span>
                      <span style={{ fontSize: '0.85rem', background: '#F1F5F9', padding: '4px 8px', borderRadius: '6px' }}>🏫 {college.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AiFinder;
