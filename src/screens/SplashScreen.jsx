import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in effect
    setTimeout(() => setOpacity(1), 100);

    // Navigation logic after 1.5 seconds
    const timer = setTimeout(() => {
      const user = localStorage.getItem('user');
      if (user) {
        navigate('/home'); // Go to Home (matching App.jsx route)
      } else {
        navigate('/login'); // Go to Login
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      transition: 'opacity 1s ease-in-out',
      opacity: opacity
    }}>
      {/* Logo Box */}
      <div style={{
        width: '120px',
        height: '120px',
        background: 'var(--primary)',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
        marginBottom: '40px',
        animation: 'float 3s ease-in-out infinite'
      }}>
        <span style={{
          color: 'white',
          fontSize: '48px',
          fontWeight: '800',
          fontFamily: 'Inter, sans-serif'
        }}>PP</span>
      </div>

      <h1 style={{
        fontSize: '3rem',
        fontWeight: '800',
        color: 'var(--primary)',
        fontFamily: 'var(--font-title)',
        marginBottom: '10px'
      }}>PathPilot</h1>

      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        maxWidth: '300px',
        lineHeight: '1.6'
      }}>
        Plan Your Computer Science Journey from 10th to PhD
      </p>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
