import React from 'react';
import { useNavigate } from 'react-router-dom';

const Legal = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '40px', padding: '30px', borderRadius: '24px', borderTop: 'none', color: 'white' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'white', fontWeight: '600', marginBottom: '12px', cursor: 'pointer', opacity: 0.8 }}>← Back</button>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Terms & Privacy</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Last Updated: February 2026</p>
      </header>

      <div className="glass" style={{ padding: '40px', borderRadius: '32px', marginBottom: '40px' }}>
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>1. Acceptance of Terms</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            By accessing and using PathPilot, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please refrain from using the platform.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>2. Privacy Policy</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Your privacy is crucial to us. We collect data such as your career preferences, educational background, and activity history to provide personalized recommendations. We do not sell your personal information to third parties.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>3. AI Recommendations</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            PathPilot uses advanced algorithms to suggest colleges and career paths. While we strive for 100% accuracy, these suggestions are for informational purposes. Always verify admission criteria with the respective institutions.
          </p>
        </section>

        <section>
          <h2 style={{ marginBottom: '16px', color: 'var(--primary)' }}>4. User Conduct</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Users are expected to provide accurate information for the best results. Any attempt to disrupt the platform's services or scrape data is strictly prohibited.
          </p>
        </section>
      </div>

      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Questions? Contact us at <span style={{ color: 'var(--primary)' }}>legal@pathpilot.com</span>
      </div>
    </div>
  );
};

export default Legal;
