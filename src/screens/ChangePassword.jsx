import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.changePassword({
        user_id: user.id,
        current_password: formData.oldPassword,
        new_password: formData.newPassword
      });
      alert("Password changed successfully!");
      navigate('/settings');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-page" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--primary)', fontWeight: '600', marginBottom: '12px' }}>← Back</button>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Change Password</h1>
      </header>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
        {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Old Password</label>
          <input
            type="password"
            className="input-field"
            value={formData.oldPassword}
            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>New Password</label>
          <input
            type="password"
            className="input-field"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Confirm New Password</label>
          <input
            type="password"
            className="input-field"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
          style={{ width: '100%', padding: '16px' }}
        >
          {isLoading ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
