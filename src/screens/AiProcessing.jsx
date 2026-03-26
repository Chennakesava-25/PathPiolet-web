import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { contentService } from '../services/apiService';

const AiProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI Engine...");

  const steps = [
    "Analyzing your preferences...",
    "Scanning 1400+ technical institutions...",
    "Calculating match scores...",
    "Optimizing career pathways...",
    "Finalizing recommendations..."
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });

      if (progress % 20 === 0 && currentStep < steps.length) {
        setStatus(steps[currentStep]);
        currentStep++;
      }
    }, 30);

    const performSearch = async () => {
      try {
        const prefs = location.state?.prefs;
        if (!prefs) {
          navigate('/ai-finder');
          return;
        }

        // Small delay to ensure animation plays
        const [response] = await Promise.all([
          contentService.getAiRecommendations(prefs),
          new Promise(resolve => setTimeout(resolve, 3000))
        ]);

        if (response.data && Array.isArray(response.data)) {
          navigate('/ai-finder', { state: { results: response.data } });
        } else {
          alert("Error: " + response.data.error);
          navigate('/ai-finder');
        }
      } catch (err) {
        console.error(err);
        alert("Failed to connect to AI service.");
        navigate('/ai-finder');
      }
    };

    performSearch();
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #EEF2FF, #F8FAFC)',
      color: 'var(--text-main)',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div className="glass" style={{
        padding: '60px',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: 'none'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '60px',
          marginBottom: '40px',
          animation: 'pulse 2s infinite'
        }}>🔮</div>

        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Ai-Power Searching</h2>
        <p style={{ fontSize: '1.2rem', opacity: '0.8', marginBottom: '48px', height: '24px' }}>{status}</p>

        <div style={{
          width: '100%',
          maxWidth: '400px',
          height: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'white',
            transition: 'width 0.1s linear'
          }}></div>
        </div>

        <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
      </div>
    </div>
  );
};

export default AiProcessing;
