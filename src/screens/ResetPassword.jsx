import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/apiService';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.resetPassword({ email, password });
      alert("Password reset successful! Please login with your new password.");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Invalid access.</h2>
      <button onClick={() => navigate('/forgot-password')} className="btn-primary" style={{ marginTop: '20px' }}>Go Back</button>
    </div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="auth-card glass animate-fade-in" style={{ maxWidth: '450px', width: '100%', padding: '40px' }}>
        <div className="auth-header" style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            color: 'white', fontSize: '32px', fontWeight: '800', boxShadow: '0 10px 20px rgba(99,102,241,0.2)'
          }}>PP</div>

          <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>New Password</h1>
          <p className="auth-subtitle" style={{ marginBottom: '32px' }}>Set a new password for your account<br /><strong>{email}</strong></p>
        </div>

        <form onSubmit={handleReset} className="auth-form">
          {error && <div className="error-message" style={{ marginBottom: '16px', color: '#ef4444', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !password || !confirmPassword}
            style={{ marginTop: '24px', width: '100%', padding: '16px' }}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
