import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const offerings = [
    "Personalized Career Roadmaps",
    "College Discovery & Comparison",
    "Educational Pathway Guidance",
    "Exam Calendar & Reminders",
    "Expert Career Advice"
  ];

  const handleLegal = (title) => {
    navigate('/legal', { state: { title, content: `Full ${title} content goes here...` } });
  };

  return (
    <div className="about-page" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '40px', padding: '30px', borderRadius: '24px', borderTop: 'none', color: 'white' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'white', fontWeight: '600', marginBottom: '12px', cursor: 'pointer', opacity: 0.8 }}>← Back</button>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>About PathPilot</h1>
      </header>

      <div className="glass" style={{ padding: '40px', borderRadius: '24px', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '20px' }}>Our Mission</h3>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '24px' }}>
          PathPilot is designed to be the ultimate companion for students aspiring to build a successful career in Computer Science.
          We bridge the gap between education and career by providing data-driven insights, personalized recommendations, and clear developmental pathways.
        </p>

        <h3 style={{ marginBottom: '20px' }}>What we offer</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
          {offerings.map((off, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
              {off}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <button className="glass" onClick={() => handleLegal('Terms & Conditions')} style={{ flex: 1, padding: '16px', borderRadius: '16px', fontWeight: '600' }}>Terms & Conditions</button>
        <button className="glass" onClick={() => handleLegal('Privacy Policy')} style={{ flex: 1, padding: '16px', borderRadius: '16px', fontWeight: '600' }}>Privacy Policy</button>
      </div>
    </div>
  );
};

export default About;
