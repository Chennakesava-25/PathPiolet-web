import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CareerDetailWrapper = ({ careerPath }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.email === 'pathpiolet@gmail.com';

  useEffect(() => {
    fetchData();
  }, [careerPath]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/career-details/${careerPath}`);
      setData(response.data);
      setEditData(JSON.parse(JSON.stringify(response.data))); // Deep clone
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching career details:', err);
      setError('Failed to load content');
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(`/api/career-details/${careerPath}`, {
        admin_email: user.email,
        title: editData.title,
        subtitle: editData.subtitle,
        content: editData.content
      });
      setData(editData);
      setIsEditing(false);
      setIsSaving(false);
    } catch (err) {
      console.error('Error saving career details:', err);
      alert('Failed to save changes');
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(JSON.parse(JSON.stringify(data)));
    setIsEditing(false);
  };

  const updateSectionTitle = (idx, val) => {
    const newContent = [...editData.content];
    newContent[idx].title = val;
    setEditData({ ...editData, content: newContent });
  };

  const updateSectionContent = (idx, val) => {
    const newContent = [...editData.content];
    newContent[idx].content = val;
    setEditData({ ...editData, content: newContent });
  };

  const updateArrayItem = (secIdx, itemIdx, val) => {
    const newContent = [...editData.content];
    newContent[secIdx].content[itemIdx] = val;
    setEditData({ ...editData, content: newContent });
  };

  const addArrayItem = (secIdx) => {
    const newContent = [...editData.content];
    newContent[secIdx].content.push("");
    setEditData({ ...editData, content: newContent });
  };

  const removeArrayItem = (secIdx, itemIdx) => {
    const newContent = [...editData.content];
    newContent[secIdx].content.splice(itemIdx, 1);
    setEditData({ ...editData, content: newContent });
  };

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!data) return null;

  const displayData = isEditing ? editData : data;

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', paddingBottom: '100px', position: 'relative' }}>
      {isAdmin && (
        <div style={{ position: 'absolute', top: '40px', right: '40px', display: 'flex', gap: '12px' }}>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="btn-primary" 
              style={{ padding: '8px 20px', borderRadius: '12px', fontSize: '0.9rem' }}
            >
              Edit Screen
            </button>
          ) : (
            <>
              <button 
                onClick={handleSave} 
                className="btn-primary" 
                style={{ padding: '8px 20px', borderRadius: '12px', fontSize: '0.9rem', background: '#10B981' }}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={handleCancel}
                style={{ padding: '8px 20px', borderRadius: '12px', fontSize: '0.9rem', background: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB' }}
                disabled={isSaving}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}

      <header style={{ marginBottom: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--primary)', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
          <span>←</span> Back to Career Paths
        </button>
        
        {isEditing ? (
          <>
            <input 
              value={editData.title} 
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              style={{ fontSize: '2.8rem', width: '100%', marginBottom: '8px', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px' }}
            />
            <input 
              value={editData.subtitle} 
              onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
              style={{ width: '100%', color: 'var(--text-muted)', fontSize: '1.1rem', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px' }}
            />
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '2.8rem', color: 'var(--text-main)', marginBottom: '8px' }}>{data.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{data.subtitle}</p>
          </>
        )}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {displayData.content.map((section, idx) => (
          <section key={idx}>
            {isEditing ? (
              <input 
                value={section.title} 
                onChange={(e) => updateSectionTitle(idx, e.target.value)}
                style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: '700', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px 8px', width: '100%' }}
              />
            ) : (
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: '700' }}>{section.title}</h3>
            )}
            
            <div className="glass" style={{ padding: '24px', borderRadius: '24px', border: '1px solid var(--border)' }}>
              {Array.isArray(section.content) ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {section.content.map((item, i) => (
                    <li key={i} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                          <input 
                            value={item} 
                            onChange={(e) => updateArrayItem(idx, i, e.target.value)}
                            style={{ flex: 1, border: '1px solid var(--border)', borderRadius: '8px', padding: '4px 8px' }}
                          />
                          <button onClick={() => removeArrayItem(idx, i)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                        </div>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                  {isEditing && (
                    <button 
                      onClick={() => addArrayItem(idx)}
                      style={{ marginTop: '10px', color: 'var(--primary)', background: 'none', border: '1px dashed var(--primary)', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer' }}
                    >
                      + Add Item
                    </button>
                  )}
                </ul>
              ) : (
                isEditing ? (
                  <textarea 
                    value={section.content} 
                    onChange={(e) => updateSectionContent(idx, e.target.value)}
                    rows={4}
                    style={{ width: '100%', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px', lineHeight: '1.6' }}
                  />
                ) : (
                  <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{section.content}</p>
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CareerDetailWrapper;
