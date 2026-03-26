import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.forgotPassword(email);
      navigate('/verify-otp', { state: { email, type: 'forgot-password' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="auth-card glass animate-fade-in" style={{ maxWidth: '450px', width: '100%', padding: '40px' }}>
        <div className="auth-header" style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/login')} className="back-link" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginBottom: '24px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ← Back
          </button>

          <div style={{
            width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            color: 'white', fontSize: '32px', fontWeight: '800', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
          }}>PP</div>

          <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Forgot Password?</h1>
          <p className="auth-subtitle" style={{ marginBottom: '32px' }}>Enter your registered email to reset your password.</p>
        </div>

        <form onSubmit={handleSendOtp} className="auth-form">
          {error && <div className="error-message" style={{ marginBottom: '16px', color: '#ef4444', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !email}
            style={{ marginTop: '24px', width: '100%', padding: '16px' }}
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>

          <div className="tip-box" style={{ marginTop: '32px', padding: '16px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary)' }}>💡 Tip:</span> Make sure to check your spam folder if you don't see the email in your inbox.
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
