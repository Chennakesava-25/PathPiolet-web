import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckEmail = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="glass" style={{
        maxWidth: '450px', width: '100%', padding: '48px', borderRadius: '32px', textAlign: 'center'
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px',
          color: '#10B981', fontSize: '40px'
        }}>✓</div>

        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Check Your Email</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
          We've sent a password reset link to your email. Please follow the instructions to reset your password.
        </p>

        <div style={{
          background: 'rgba(99, 102, 241, 0.05)', padding: '20px', borderRadius: '16px', marginBottom: '40px'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email sent to:</p>
          <p style={{ fontWeight: '700', color: 'var(--primary)' }}>user@example.com</p>
        </div>

        <button className="btn-primary"
          onClick={() => navigate('/login')}
          style={{ width: '100%', padding: '16px', borderRadius: '16px' }}>
          Back to Login
        </button>

        <p style={{ marginTop: '32px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Didn't receive the email? <span style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }}>Resend</span>
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
