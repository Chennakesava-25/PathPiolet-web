import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/apiService';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email, type } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.verifyOtp({ email, otp });
      if (type === 'signup') {
        alert('Registration successful! Welcome to PathPilot.');
        // Automatic login
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/home');
        } else {
          navigate('/login');
        }
      } else {
        navigate('/reset-password', { state: { email, otp } });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setResendStatus('Sending...');
    try {
      if (type === 'signup') {
        // For signup, we don't have a separate resend yet in backend, but we can reuse register or add a resend endpoint
        // For now, let's assume we can trigger a resend via a generic resend endpoint if added, 
        // or just re-request the specific action.
        // Let's use forgotPassword as a proxy for resend if we don't have a specific register-resend.
        await authService.forgotPassword(email);
      } else {
        await authService.forgotPassword(email);
      }
      setResendStatus('OTP Resent!');
      setTimeout(() => setResendStatus(''), 3000);
    } catch (err) {
      setError('Failed to resend OTP');
      setResendStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)' }}>
        <div className="glass" style={{ padding: '40px', textAlign: 'center', borderRadius: '24px' }}>
          <h2 style={{ color: '#1E293B', marginBottom: '20px' }}>Invalid access.</h2>
          <button onClick={() => navigate('/login')} className="btn-primary" style={{ padding: '12px 24px' }}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)'
    }}>
      <div className="glass" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        color: '#1E293B'
      }}>
        <div className="auth-header" style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate(type === 'signup' ? '/signup' : '/forgot-password')}
            className="back-link"
            style={{ background: 'none', border: 'none', color: '#1E293B', cursor: 'pointer', marginBottom: '24px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}
          >
            ← Back
          </button>

          <div style={{
            width: '80px',
            height: '80px',
            background: 'white',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: '#6366F1',
            fontSize: '32px',
            fontWeight: '800',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}>PP</div>

          <h1 style={{ fontSize: '2rem', marginBottom: '12px', color: '#1E293B' }}>Verify OTP</h1>
          <p style={{ color: '#64748B', marginBottom: '32px' }}>
            {type === 'signup' ? 'Verify your email to complete registration.' : 'Enter the code to reset your password.'}
            <br />Sent to <strong>{email}</strong>
          </p>
        </div>

        <form onSubmit={handleVerify}>
          {error && (
            <div style={{
              background: '#FEE2E2',
              color: '#B91C1C',
              padding: '12px',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              style={{ textAlign: 'center', fontSize: '32px', letterSpacing: '8px', fontWeight: 'bold', border: '2px solid #E2E8F0' }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || otp.length !== 6}
            style={{ width: '100%', padding: '16px' }}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading || resendStatus !== ''}
              style={{ background: 'none', border: 'none', color: '#6366F1', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}
            >
              {resendStatus || "Didn't receive code? Resend"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
