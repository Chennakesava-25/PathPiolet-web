import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerPaths = () => {
  const navigate = useNavigate();
  const [isBTech, setIsBTech] = useState(true);

  const btechJobs = [
    { title: "Software Developer", subtitle: "AI/ML Engineer", color: "#6366F1", icon: "💻", path: "/career-paths/software-developer" },
    { title: "Web Developer", subtitle: "Full Stack Expert", color: "#A855F7", icon: "🌐", path: "/career-paths/web-developer" },
    { title: "Data Scientist", subtitle: "Big Data Analyst", color: "#FBBF24", icon: "📊", path: "/career-paths/data-scientist" },
    { title: "App Developer", subtitle: "Mobile & Cross-platform", color: "#10B981", icon: "📱", path: "/career-paths/app-developer" },
    { title: "DevOps Engineer", subtitle: "SRE & Automation", color: "#EF4444", icon: "⚙️", path: "/career-paths/devops-engineer" },
    { title: "Cloud Engineer", subtitle: "AWS/Azure Solutions", color: "#3B82F6", icon: "☁️", path: "/career-paths/cloud-engineer" }
  ];

  const bscJobs = [
    { title: "Software Developer", subtitle: "App Development", color: "#6366F1", icon: "💻", path: "/career-paths/software-developer-bsc" },
    { title: "Web Developer", subtitle: "Frontend & Backend", color: "#A855F7", icon: "🌐", path: "/career-paths/web-developer-bsc" },
    { title: "Data Analyst", subtitle: "Business Intelligence", color: "#FBBF24", icon: "📊", path: "/career-paths/data-analyst" },
    { title: "System Analyst", subtitle: "IT Solutions", color: "#10B981", icon: "🖥️", path: "/career-paths/system-analyst" },
    { title: "IT Support Specialist", subtitle: "Technical Support", color: "#EF4444", icon: "🛠️", path: "/career-paths/it-support" },
    { title: "Research Assistant", subtitle: "Academic Research", color: "#3B82F6", icon: "🔬", path: "/career-paths/research-assistant" }
  ];

  const currentJobs = isBTech ? btechJobs : bscJobs;

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '40px', padding: '30px', borderRadius: '24px', borderTop: 'none', color: 'white' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'white', fontWeight: '600', marginBottom: '12px', cursor: 'pointer', opacity: 0.8 }}>← Back</button>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Career Pathways</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Explore specialized job roles and success metrics</p>
      </header>

      {/* Toggle */}
      <div className="glass" style={{ display: 'inline-flex', padding: '6px', borderRadius: '16px', marginBottom: '40px' }}>
        <button
          onClick={() => setIsBTech(true)}
          style={{
            padding: '12px 32px', borderRadius: '12px', cursor: 'pointer', border: 'none', fontWeight: '700',
            background: isBTech ? 'var(--primary)' : 'transparent',
            color: isBTech ? 'white' : 'var(--text-main)',
            transition: 'all 0.3s'
          }}>B.Tech</button>
        <button
          onClick={() => setIsBTech(false)}
          style={{
            padding: '12px 32px', borderRadius: '12px', cursor: 'pointer', border: 'none', fontWeight: '700',
            background: !isBTech ? '#FBBF24' : 'transparent',
            color: !isBTech ? 'white' : 'var(--text-main)',
            transition: 'all 0.3s'
          }}>B.Sc</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {currentJobs.map((job, idx) => (
          <div key={idx} className="glass" style={{
            padding: '24px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px',
            cursor: 'pointer', transition: 'transform 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => navigate(job.path)}
          >
            <div style={{
              width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', background: `${job.color}15`, color: job.color
            }}>{job.icon}</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{job.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{job.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Career Tip Card */}
      <div className="glass" style={{
        marginTop: '60px', padding: '32px', borderRadius: '32px',
        background: isBTech ? 'rgba(99, 102, 241, 0.05)' : 'rgba(251, 191, 36, 0.05)',
        border: `1px solid ${isBTech ? 'var(--primary)' : '#FBBF24'}20`
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '32px' }}>💡</div>
          <div>
            <h4 style={{ marginBottom: '12px', color: isBTech ? 'var(--primary)' : '#D97706' }}>Career Success Milestone</h4>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {isBTech
                ? "B.Tech graduates often command a 25-40% higher starting premium in core software engineering roles. We recommend building a strong portfolio of projects starting from your 3rd year."
                : "B.Sc graduates have a strong edge in theoretical research and data science fundamentals. Pursuing a Masters degree (M.Sc/MCA) can equalize and sometimes surpass B.Tech salary benchmarks."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;
