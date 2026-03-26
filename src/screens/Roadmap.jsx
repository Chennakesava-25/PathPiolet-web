import React from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/apiService';

const Roadmap = () => {
  const navigate = useNavigate();

  const timelineItems = [
    {
      date: "10th",
      title: "Foundation",
      subtitle: "Start your Computer Science journey from 10th",
      status: "0 of 4 modules completed",
      icon: "🏫",
      color: "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
      path: "/roadmap/foundation"
    },
    {
      date: "12th MPC",
      title: "Preparation",
      subtitle: "Build strong foundation & prepare for entrance exams",
      status: "Not Started",
      icon: "📚",
      color: "linear-gradient(135deg, #C084FC 0%, #A855F7 100%)",
      path: "/roadmap/preparation"
    },
    {
      date: "B.Tech / B.Sc",
      title: "Graduation",
      subtitle: "4 or 3 years",
      status: "Upcoming",
      icon: "🎓",
      color: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
      path: "/roadmap/graduation"
    },
    {
      date: "M.Tech / M.Sc",
      title: "Masters",
      subtitle: "2 years specialization",
      status: "Upcoming",
      icon: "📖",
      color: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
      path: "/roadmap/masters"
    },
    {
      date: "Ph.D",
      title: "Doctorate",
      subtitle: "3–5 years research",
      status: "Upcoming",
      icon: "🎖️",
      color: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
      path: "/roadmap/phd"
    },
    {
      date: "Career Success",
      title: "Career",
      subtitle: "Professor / Tech Expert / Research Scientist",
      status: "Goal",
      icon: "💼",
      color: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
      path: "/roadmap/career"
    }
  ];

  return (
    <div className="roadmap-page" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '48px', padding: '30px', borderRadius: '24px', borderTop: 'none', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)', marginBottom: '8px' }}>Career Roadmap</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Your step-by-step guide to a successful Computer Science career</p>
      </header>

      <div className="timeline-container" style={{ position: 'relative', paddingLeft: '40px' }}>
        {/* The vertical line */}
        <div style={{
          position: 'absolute',
          left: '19px',
          top: '0',
          bottom: '40px',
          width: '2px',
          background: 'var(--border)',
          zIndex: 0
        }}></div>

        {timelineItems.map((item, idx) => (
          <div key={idx} className="timeline-item" style={{
            marginBottom: '40px',
            position: 'relative',
            animation: `fadeIn 0.5s ease forwards ${idx * 0.1}s`,
            opacity: 0
          }}>
            {/* Timeline Dot/Icon */}
            <div style={{
              position: 'absolute',
              left: '-40px',
              top: '0',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              boxShadow: 'var(--shadow-md)',
              zIndex: 1
            }}>
              {item.icon}
            </div>

            <div
              className="glass"
              onClick={() => {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user.id) {
                  contentService.saveRoadmap({
                    user_id: user.id,
                    roadmap_title: item.title,
                    roadmap_path: item.path
                  }).catch(e => console.error("Failed to save roadmap to activity history", e));
                }
                navigate(item.path);
              }}
              style={{
                marginLeft: '20px',
                padding: '24px',
                borderRadius: '24px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{item.date}</span>
                <h3 style={{ fontSize: '1.4rem', margin: '4px 0 8px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.subtitle}</p>
                {item.status && (
                  <span style={{
                    marginTop: '12px',
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>{item.status}</span>
                )}
              </div>
              <div style={{ fontSize: '24px', color: 'var(--border)' }}>→</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Roadmap;
