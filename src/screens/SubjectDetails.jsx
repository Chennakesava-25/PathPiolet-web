import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SubjectDetails = () => {
  const { subjectName } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--primary)', fontWeight: '600', marginBottom: '24px', cursor: 'pointer' }}>← Back</button>

      <div className="glass" style={{ padding: '48px', borderRadius: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>📖</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{subjectName || 'Subject Detail'}</h1>
        <div style={{
          display: 'inline-block', padding: '8px 24px', borderRadius: '20px',
          background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontWeight: '700',
          marginBottom: '32px'
        }}>Status: Comprehensive Guide Pending</div>

        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Deep dive into <strong>{subjectName}</strong>. Our subject experts are compiling the essential resources to master this domain.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px', textAlign: 'left' }}>
          {[
            "Core Concepts",
            "Practical Implementations",
            "Interview Questions",
            "Best Learning Resources",
            "Project Ideas",
            "Industry Relevance"
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
              <span style={{ color: 'var(--primary)' }}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
