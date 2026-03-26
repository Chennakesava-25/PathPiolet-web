import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentService } from '../services/apiService';

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await contentService.getColleges();
        const found = response.data.find(c => String(c.id) === String(id) || c.name === id);
        setCollege(found);

        if (user.id && found) {
          const savedRes = await contentService.getSavedColleges(user.id);
          const savedIds = savedRes.data || [];
          setIsSaved(savedIds.includes(String(found.id)) || savedIds.includes(found.name));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, user.id]);

  const handleSave = async () => {
    if (!college) return;
    try {
      if (isSaved) {
        await contentService.unsaveCollege(user.id, college.id || college.name);
        setIsSaved(false);
      } else {
        await contentService.saveCollege({ user_id: user.id, college_id: college.id || college.name });
        setIsSaved(true);
      }
    } catch (err) {
      alert("Action failed. Please try again.");
    }
  };

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading college details...</div>;
  if (!college) return <div style={{ padding: '40px', textAlign: 'center' }}>College not found</div>;

  return (
    <div className="college-details-page" style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Blue Header Section */}
      <div style={{ background: '#1E3A8A', color: 'white', padding: '30px 20px 80px', position: 'relative' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <span>←</span> College Details
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '800px', margin: '-60px auto 0', padding: '0 20px', position: 'relative', zIndex: 10 }}>

        {/* White Overlapping Card */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '24px', position: 'relative' }}>

          <button
            onClick={handleSave}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', fontSize: '2rem', color: isSaved ? '#FCD34D' : '#CBD5E1', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
            title={isSaved ? "Saved" : "Save College"}
          >
            ★
          </button>

          <h1 style={{ color: '#1E3A8A', fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px', paddingRight: '40px' }}>
            {college.name}
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.2rem' }}>📍</span> {college.city || college.location}, {college.state}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {college.nirf_rank && college.nirf_rank !== 'N/A' && (
              <div style={{ background: '#EFF6FF', color: '#3B82F6', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>
                #{college.nirf_rank} NIRF Ranking
              </div>
            )}
            {college.match_score && (
              <div style={{ background: '#F0FDF4', color: '#16A34A', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>
                Score: {typeof college.match_score === 'number' ? college.match_score.toFixed(2) : college.match_score}
              </div>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Total Fees</div>
            <div style={{ color: '#1E3A8A', fontSize: '1.1rem', fontWeight: '800' }}>{college.fees || 'N/A'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>Avg Package</div>
            <div style={{ color: '#1E3A8A', fontSize: '1.1rem', fontWeight: '800' }}>{college.avg_package || college.average_package || 'N/A'}</div>
          </div>
        </div>

        {/* About Section */}
        <div style={{ padding: '0 10px' }}>
          <h2 style={{ color: '#1E3A8A', fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px' }}>About Institute</h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
            {college.description || `The ${college.name} is a premier institution located in ${college.city || college.location}. It provides quality education and excellent placement opportunities in the field of engineering, science, and management.`}
          </p>

          <a href={college.website && college.website.startsWith('http') ? college.website : `https://${college.website || 'google.com/search?q=' + college.name}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', color: '#3B82F6', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem' }}>
            Visit Official Website ↗
          </a>
        </div>

      </div>
    </div>
  );
};

export default CollegeDetails;
