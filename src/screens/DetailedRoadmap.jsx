import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailedRoadmap = () => {
  const { stage } = useParams();
  const navigate = useNavigate();
  const [stageData, setStageData] = useState(null);

  const roadmapContent = {
    foundation: {
      title: "Foundation",
      subtitle: "Start your journey from 10th",
      icon: "🏫",
      color: "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
      modules: [
        { title: "Mathematics Core", desc: "Algebra, Geometry, Trigonometry" },
        { title: "Logical Reasoning", desc: "Aptitude and problem solving" },
        { title: "Basic Programming", desc: "Introduction to logic with Python/Scratch" },
        { title: "Science Fundamentals", desc: "Physics and Chemistry basics" }
      ],
      careers: ["Software Dev", "Web Dev", "App Dev"],
      onCareerClick: () => navigate('/career-paths')
    },
    preparation: {
      title: "Preparation",
      subtitle: "12th MPC & Entrance Exams",
      icon: "📚",
      color: "linear-gradient(135deg, #C084FC 0%, #A855F7 100%)",
      modules: [
        { title: "Advanced Math", desc: "Calculus, Vectors, Probability" },
        { title: "Physics Mastery", desc: "Mechanics, Electricity, Magnetism" },
        { title: "Competitive Prep", desc: "JEE Main / Advanced / State Exams" },
        { title: "Computer Science Elective", desc: "C++ or Python at school level" }
      ],
      careers: ["Data Science", "Cyber Security", "AI Engineer"]
    },
    graduation: {
      title: "Graduation",
      subtitle: "B.Tech / B.Sc Degree (3-4 Years)",
      icon: "🎓",
      color: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
      tabs: ["B.Tech", "B.Sc"],
      content: {
        "B.Tech": {
          duration: "4 Years",
          focus: ["Theory + Projects", "University exams", "Industrial Internship"],
          specs: ["AI & ML", "Data Science", "Cyber Security", "Cloud Computing"]
        },
        "B.Sc": {
          duration: "3 Years",
          focus: ["Theory focused", "Solid fundamentals", "Research preparation"],
          specs: ["Data Science", "AI", "Advanced Computing"]
        }
      }
    },
    masters: {
      title: "Masters",
      subtitle: "Specialization (2 Years)",
      icon: "📖",
      color: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
      tabs: ["M.Tech", "M.Sc"],
      content: {
        "M.Tech": {
          duration: "2 Years",
          focus: ["Industry + Projects", "Research Thesis"],
          exams: ["GATE", "University Exams"],
          specs: ["AI & ML", "Data Science", "Cyber Security"]
        },
        "M.Sc": {
          duration: "2 Years",
          focus: ["Theory", "Research focus"],
          admission: "Merit-based admission",
          specs: ["Data Science", "AI", "Advanced Computing"]
        }
      }
    },
    phd: {
      title: "Ph.D in Computer Science",
      subtitle: "Doctor of Philosophy - Research Excellence",
      icon: "🔬",
      color: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)"
    },
    career: {
      title: "Career Success",
      subtitle: "Job Opportunities",
      icon: "💼",
      color: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
      tabs: ["B.Tech", "B.Sc"]
    }
  };

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const data = roadmapContent[stage?.toLowerCase()];
    setStageData(data);
    if (data?.tabs) {
      setActiveTab(data.tabs[0]);
    }
  }, [stage]);

  if (!stageData) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Stage not found</div>;
  }

  if (stage?.toLowerCase() === 'foundation') {
    return (
      <div className="foundation-roadmap" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        {/* Blue Header */}
        <header className="glass-blue" style={{
          padding: '40px 24px',
          color: 'white',
          borderRadius: '0 0 32px 32px',
          marginBottom: '20px',
          borderTop: 'none'
        }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'none', border: 'none', color: 'white', fontWeight: '600',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px'
          }}>← Back</button>
          <h1 style={{ fontSize: '1.8rem', maxWidth: '300px', lineHeight: '1.3' }}>
            Computer Science Career Roadmap After 10th
          </h1>
        </header>

        <div style={{ padding: '20px', marginTop: '-40px' }}>
          {/* Intro Card */}
          <div className="glass" style={{
            padding: '32px', borderRadius: '32px', textAlign: 'center', marginBottom: '40px',
            background: 'rgba(255, 255, 255, 0.9)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%', background: 'white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)',
              fontSize: '20px', fontWeight: 'bold'
            }}>&lt; &gt;</div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Start Your Computer Science Journey</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Step-by-step roadmap to become a Software Engineer
            </p>
          </div>

          {/* Timeline Section */}
          <div style={{ position: 'relative', paddingLeft: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              position: 'absolute', left: '14px', top: '10px', bottom: '0',
              width: '2px', background: 'var(--primary)', opacity: 0.3
            }}></div>

            {/* STEP 1 */}
            <div style={{ position: 'relative', marginBottom: '48px' }}>
              <div style={{
                position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px',
                borderRadius: '8px', background: 'var(--primary)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px'
              }}>🪧</div>
              <div className="glass" style={{ padding: '24px', borderRadius: '24px' }}>
                <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', marginBottom: '4px' }}>STEP 1</div>
                <h3 style={{ marginBottom: '16px' }}>Choose Stream After 10th</h3>

                {/* Intermediate Box */}
                <div style={{
                  background: 'rgba(99, 102, 241, 0.05)', padding: '20px', borderRadius: '16px',
                  border: '1px solid rgba(99, 102, 241, 0.1)', marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🚸</div>
                    <h4 style={{ fontSize: '1.1rem' }}>Intermediate (MPC)</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Maths + Physics + Chemistry</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '8px' }}>
                    <span style={{ color: '#10B981' }}>✓</span> <span>Eligible for B.Tech CSE</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#10B981' }}>✓</span> <span>Eligible for B.Sc CS</span>
                  </div>
                </div>

                {/* Polytechnic Box */}
                <div style={{
                  background: 'rgba(251, 191, 36, 0.05)', padding: '20px', borderRadius: '16px',
                  border: '1px solid rgba(251, 191, 36, 0.1)'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📜</div>
                    <h4 style={{ fontSize: '1.1rem' }}>Polytechnic (Diploma)</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Engineering - 3 Years</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#10B981' }}>✓</span> <span>Direct 2nd Year B.Tech (Lateral Entry)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div style={{ position: 'relative', marginBottom: '48px' }}>
              <div style={{
                position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px',
                borderRadius: '8px', background: '#1E3A8A', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px'
              }}>🎯</div>
              <div className="glass" style={{ padding: '24px', borderRadius: '24px' }}>
                <div style={{ color: '#1E3A8A', fontWeight: '800', fontSize: '0.8rem', marginBottom: '4px' }}>STEP 2</div>
                <h3 style={{ marginBottom: '16px' }}>Choose Your Path</h3>

                {/* Path A */}
                <div style={{
                  background: 'white', padding: '20px', borderRadius: '16px',
                  border: '1px solid #E2E8F0', marginBottom: '16px', position: 'relative'
                }}>
                  <span style={{ position: 'absolute', right: '12px', top: '-10px', background: '#FBBF24', color: 'white', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '10px', fontWeight: 'bold' }}>⭐ RECOMMENDED</span>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Path A - B.Tech CSE</h4>
                  {[
                    "Duration: 4 Years",
                    "Focus: Engineering + Projects",
                    "Entrance: JEE / EAMCET",
                    "Better campus placements"
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: '#10B981' }}>✓</span> <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Path B */}
                <div style={{
                  background: 'white', padding: '20px', borderRadius: '16px',
                  border: '1px solid #E2E8F0'
                }}>
                  <h4 style={{ color: '#1E3A8A', marginBottom: '12px' }}>Path B - B.Sc Computer Science</h4>
                  {[
                    "Duration: 3 Years",
                    "Focus: Theory - Programming",
                    "Admission: Mostly merit-based",
                    "Good for M.Sc / Research"
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: '#64748B' }}>⏺</span> <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div style={{ position: 'relative', marginBottom: '48px' }}>
              <div style={{
                position: 'absolute', left: '-40px', top: '0', width: '30px', height: '30px',
                borderRadius: '8px', background: '#10B981', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px'
              }}>💼</div>
              <div className="glass" style={{ padding: '24px', borderRadius: '24px' }}>
                <div style={{ color: '#10B981', fontWeight: '800', fontSize: '0.8rem', marginBottom: '4px' }}>STEP 3</div>
                <h3 style={{ marginBottom: '20px' }}>Career Opportunities</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {[
                    { label: "Software Developer", icon: "💻", path: "/career-paths/software-developer" },
                    { label: "Web Developer", icon: "🌐", path: "/career-paths/web-developer" },
                    { label: "Data Analyst", icon: "📊", path: "/career-paths/data-analyst" },
                    { label: "AI/ML Engineer", icon: "🧠", path: "/career-paths/software-developer" },
                    { label: "Cyber Security", icon: "🛡️", path: "/career-paths/devops-engineer" },
                    { label: "App Developer", icon: "📱", path: "/career-paths/app-developer" }
                  ].map((job, idx) => (
                    <div key={idx}
                      onClick={() => navigate(job.path)}
                      style={{
                        padding: '12px', background: 'rgba(99,102,241,0.05)', borderRadius: '12px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                        textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{job.icon}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>{job.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Box */}
          <div style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
            padding: '32px', borderRadius: '32px', color: 'white', marginBottom: '40px'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontSize: '1.2rem' }}>
              🎖️ Which Should You Choose?
            </h3>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
              <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>🏠 If you want high salary & strong tech career:</p>
              <div style={{ color: '#FBBF24', fontWeight: '700' }}>MPC + B.Tech CSE</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px', marginBottom: '32px' }}>
              <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>🎓 If you want shorter course or research path:</p>
              <div style={{ color: '#FBBF24', fontWeight: '700' }}>MPC + B.Sc CS</div>
            </div>

            <button className="btn-primary" onClick={() => navigate('/colleges')} style={{
              width: '100%', background: '#FBBF24', color: '#1E1B4B', padding: '16px',
              borderRadius: '16px', fontWeight: 'bold'
            }}>Explore Colleges →</button>
          </div>
        </div>
      </div>
    );
  }

  if (stage?.toLowerCase() === 'preparation') {
    return (
      <div className="preparation-roadmap" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        {/* Header */}
        <header className="glass-blue" style={{ padding: '30px 24px', borderRadius: '0 0 32px 32px', borderTop: 'none', color: 'white', marginBottom: '20px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'
          }}>← Back</button>
          <h1 style={{ fontSize: '1.6rem', color: '#1E1B4B', fontWeight: '800' }}>
            Step 2: Complete 12th (MPC)
          </h1>
        </header>

        <div style={{ padding: '20px' }}>
          {/* Hero Card */}
          <div style={{
            background: 'var(--primary)',
            padding: '48px 32px',
            borderRadius: '32px',
            color: 'white',
            textAlign: 'center',
            marginBottom: '32px',
            boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2)'
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px',
              fontSize: '40px'
            }}>📖</div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Build Your Foundation</h2>
            <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '300px', margin: '0 auto' }}>
              Focus on core subjects and prepare for entrance exams
            </p>
          </div>

          {/* Education Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
              <h3 style={{ fontSize: '1.2rem' }}>Education</h3>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { title: "JEE", desc: "Joint Entrance Examination", color: "rgba(99,102,241,0.05)" },
                { title: "EAMCET", desc: "Engineering, Agriculture & Medical Common Entrance Test", color: "rgba(99,102,241,0.05)" },
                { title: "University Entrance Exams", desc: "State & university-level entrance tests", color: "rgba(99,102,241,0.05)" }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '20px', background: item.color, borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer'
                }} onClick={() => navigate(`/exam-details/${item.title}`)}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📚</div>
              <h3 style={{ fontSize: '1.2rem' }}>Subjects</h3>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              {[
                { name: "Mathematics", icon: "📐", color: "#EEF2FF" },
                { name: "Physics", icon: "⚖️", color: "#FEF9C3" },
                { name: "Chemistry", icon: "🧪", color: "#DCFCE7" }
              ].map((subject, idx) => (
                <div key={idx} style={{
                  flex: 1, padding: '16px 8px', background: subject.color, borderRadius: '16px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  textAlign: 'center', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.05)'
                }} onClick={() => navigate(`/subject-details/${subject.name}`)}>
                  <span style={{ fontSize: '1.5rem' }}>{subject.icon}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{subject.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#A855F7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💡</div>
              <h3 style={{ fontSize: '1.2rem' }}>Skills to Build</h3>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { title: "Problem-solving", icon: "🧠" },
                { title: "Analytical skills", icon: "📊" },
                { title: "Coding basics", icon: "💻" }
              ].map((skill, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
                  background: 'rgba(255,255,255,0.5)', borderRadius: '16px', border: '1px solid #F1F5F9'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    {skill.icon}
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{skill.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button onClick={() => navigate('/roadmap/graduation')} style={{
            width: '100%', padding: '20px', background: 'var(--primary)', color: 'white',
            borderRadius: '20px', fontWeight: 'bold', fontSize: '1.1rem',
            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)', cursor: 'pointer',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            Next: Join B.Tech / B.Sc <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        </div>
      </div>
    );
  }

  if (stage?.toLowerCase() === 'graduation') {
    const isBTech = activeTab === "B.Tech";
    const content = stageData.content[activeTab] || {};
    const themeColor = isBTech ? 'var(--primary)' : '#F59E0B'; // Blue for B.Tech, Orange for B.Sc

    return (
      <div className="graduation-roadmap" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        {/* Header */}
        <header className="glass-blue" style={{ padding: '30px 24px', borderRadius: '0 0 32px 32px', borderTop: 'none', color: 'white', marginBottom: '20px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'none', border: 'none', color: themeColor, fontWeight: '600',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'
          }}>← Back</button>
          <h1 style={{ fontSize: '1.6rem', color: '#1E1B4B', fontWeight: '800' }}>
            Step 3: Join B.Tech / B.Sc in CS
          </h1>
        </header>

        <div style={{ padding: '20px' }}>
          {/* Tabs */}
          <div className="glass" style={{
            display: 'flex', padding: '6px', borderRadius: '16px', marginBottom: '32px',
            background: 'white', border: '1px solid #E2E8F0'
          }}>
            {stageData.tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s'
              }}>
                {tab === "B.Tech" ? "B.Tech CSE" : "B.Sc Computer Science"}
              </button>
            ))}
          </div>

          {/* Duration Card */}
          <div style={{
            background: isBTech ? 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            padding: '24px 32px', borderRadius: '24px', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '32px', boxShadow: `0 10px 30px ${isBTech ? 'rgba(79, 70, 229, 0.2)' : 'rgba(217, 119, 6, 0.2)'}`
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', opacity: 0.9, display: 'block', marginBottom: '4px' }}>UG Duration</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{content.duration}</h2>
            </div>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px'
            }}>🎓</div>
          </div>

          {/* Focus Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800', color: '#1E1B4B' }}>Focus</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {content.focus.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                  background: isBTech ? 'rgba(99, 102, 241, 0.05)' : 'rgba(251, 191, 36, 0.05)',
                  borderRadius: '16px', color: 'var(--text-main)', fontSize: '0.95rem'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: themeColor }}></div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Specializations Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800', color: '#1E1B4B' }}>Specializations</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(isBTech ? [
                { name: "AI & ML", color: "#4F46E5" },
                { name: "Data Science", color: "#8B5CF6" },
                { name: "Cyber Security", color: "#F59E0B" },
                { name: "Cloud Computing", color: "#10B981" }
              ] : [
                { name: "Data Science", color: "#F59E0B" },
                { name: "AI", color: "#8B5CF6" },
                { name: "Advanced Computing", color: "#4F46E5" }
              ]).map((spec, i) => (
                <span key={i} style={{
                  padding: '8px 16px', borderRadius: '12px', background: spec.color,
                  color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
                }}>{spec.name}</span>
              ))}
            </div>
          </div>

          {/* Career Outcomes Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: '800', color: '#1E1B4B' }}>Career Outcomes</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {(isBTech ? [
                { name: "Software Developer", icon: "💻", color: "#4F46E5", path: "/career-paths/software-developer" },
                { name: "AI Engineer", icon: "🤖", color: "#8B5CF6", path: "/career-paths/software-developer" },
                { name: "Data Scientist", icon: "📊", color: "#F59E0B", path: "/career-paths/data-scientist" },
                { name: "App Developer", icon: "📱", color: "#10B981", path: "/career-paths/app-developer" }
              ] : [
                { name: "Software Developer", icon: "💻", color: "#F59E0B", path: "/career-paths/software-developer-bsc" },
                { name: "Data Scientist", icon: "📊", color: "#8B5CF6", path: "/career-paths/data-analyst" },
                { name: "IT Support", icon: "👨‍🏫", color: "#10B981", path: "/career-paths/it-support" },
                { name: "Research Assistant", icon: "🔬", color: "#4F46E5", path: "/career-paths/research-assistant" }
              ]).map((job, idx) => (
                <div key={idx}
                  onClick={() => navigate(job.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
                    background: isBTech ? 'rgba(99, 102, 241, 0.03)' : 'rgba(251, 191, 36, 0.03)',
                    borderRadius: '20px', border: '1px solid rgba(0,0,0,0.03)',
                    cursor: 'pointer', transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(8px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', background: job.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    color: 'white'
                  }}>{job.icon}</div>
                  <span style={{ fontWeight: '600', color: '#1E1B4B', fontSize: '0.95rem' }}>{job.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button onClick={() => navigate('/roadmap/masters')} style={{
            width: '100%', padding: '20px', background: 'var(--primary)', color: 'white',
            borderRadius: '20px', fontWeight: 'bold', fontSize: '1.1rem',
            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)', cursor: 'pointer',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            Next: Pursue M.Tech / M.Sc <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        </div>
      </div>
    );
  }



  if (stage?.toLowerCase() === 'masters') {
    const isMTech = activeTab === "M.Tech";
    const content = stageData.content[activeTab] || {};
    const themeColor = isMTech ? '#8B5CF6' : '#F59E0B'; // Purple for M.Tech, Orange for M.Sc

    return (
      <div className="masters-roadmap" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        <header className="glass-blue" style={{ padding: '30px 24px', borderRadius: '0 0 32px 32px', borderTop: 'none', color: 'white', marginBottom: '20px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'none', border: 'none', color: themeColor, fontWeight: '600',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'
          }}>← Back</button>
          <h1 style={{ fontSize: '1.6rem', color: '#1E1B4B', fontWeight: '800' }}>
            Step 4: Pursue M.Tech / M.Sc
          </h1>
        </header>

        <div style={{ padding: '20px' }}>
          {/* Tabs */}
          <div className="glass" style={{
            display: 'flex', padding: '6px', borderRadius: '16px', marginBottom: '32px',
            background: 'white', border: '1px solid #E2E8F0'
          }}>
            {stageData.tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
                background: activeTab === tab ? (tab === "M.Tech" ? '#8B5CF6' : '#F59E0B') : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s'
              }}>
                {tab === "M.Tech" ? "M.Tech CSE" : "M.Sc Computer Science"}
              </button>
            ))}
          </div>

          {/* Duration Card */}
          <div style={{
            background: isMTech ? 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            padding: '24px 32px', borderRadius: '24px', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '32px', boxShadow: `0 10px 30px ${isMTech ? 'rgba(139, 92, 246, 0.2)' : 'rgba(217, 119, 6, 0.2)'}`
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', opacity: 0.9, display: 'block', marginBottom: '4px' }}>PG Duration</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{content.duration}</h2>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '4px' }}>{isMTech ? "Engineering Focus" : "Science Focus"}</p>
            </div>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px'
            }}>📖</div>
          </div>

          {/* Focus Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800', color: '#1E1B4B' }}>{isMTech ? "Sections" : "Focus"}</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {content.focus.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                  background: isMTech ? 'rgba(139, 92, 246, 0.05)' : 'rgba(251, 191, 36, 0.05)',
                  borderRadius: '16px', color: 'var(--text-main)', fontSize: '0.95rem'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: themeColor }}></div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Entrance / Admission Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800', color: '#1E1B4B' }}>{isMTech ? "Entrance Exams" : "Admission"}</h3>
            {isMTech ? (
              <div style={{ display: 'flex', gap: '12px' }}>
                {content.exams.map((e, idx) => (
                  <div key={idx} style={{
                    flex: 1, padding: '20px', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '16px',
                    border: '1px solid rgba(139, 92, 246, 0.1)', textAlign: 'center',
                    color: '#6D28D9', fontWeight: '600', fontSize: '0.9rem'
                  }}>{e}</div>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '20px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '16px',
                border: '1px solid rgba(251, 191, 36, 0.2)', color: '#D97706',
                fontWeight: '600', fontSize: '0.95rem', textAlign: 'center'
              }}>
                {content.admission}
              </div>
            )}
          </div>

          {/* Specializations Section */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800', color: '#1E1B4B' }}>Specializations</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {content.specs.map((spec, i) => (
                <span key={i} style={{
                  padding: '8px 16px', borderRadius: '20px', background: isMTech ? '#6366F1' : '#F59E0B',
                  color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
                }}>{spec}</span>
              ))}
            </div>
          </div>

          {/* Career Opportunities */}
          <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', fontWeight: '800', color: '#1E1B4B' }}>{isMTech ? "Career Opportunities" : "Career Outcomes"}</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {(isMTech ? [
                { name: "Senior Engineer", icon: "🎖️", color: "#8B5CF6", path: "/career-paths/software-developer" },
                { name: "AI Engineer", icon: "🤖", color: "#6366F1", path: "/career-paths/software-developer" },
                { name: "Data Scientist", icon: "📊", color: "#F59E0B", path: "/career-paths/data-scientist" }
              ] : [
                { name: "University Lecturer", icon: "👨‍🏫", color: "#F59E0B", path: "/career-paths/research-assistant" },
                { name: "Data Scientist", icon: "📊", color: "#8B5CF6", path: "/career-paths/data-analyst" },
                { name: "Research Assistant", icon: "🔬", color: "#6366F1", path: "/career-paths/research-assistant" }
              ]).map((job, idx) => (
                <div key={idx}
                  onClick={() => navigate(job.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
                    background: isMTech ? 'rgba(139, 92, 246, 0.03)' : 'rgba(251, 191, 36, 0.03)',
                    borderRadius: '20px', border: '1px solid rgba(0,0,0,0.03)',
                    cursor: 'pointer', transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(8px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', background: job.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    color: 'white'
                  }}>{job.icon}</div>
                  <span style={{ fontWeight: '600', color: '#1E1B4B' }}>{job.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => navigate('/roadmap/phd')} style={{
            width: '100%', padding: '20px', background: 'var(--primary)', color: 'white',
            borderRadius: '20px', fontWeight: 'bold', fontSize: '1.1rem',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            Next: P.hd <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        </div>
      </div>
    );
  }

  if (stage?.toLowerCase() === 'phd' || stage?.toLowerCase() === 'doctorate') {
    return (
      <div className="phd-roadmap" style={{ background: '#FFFDF5', minHeight: '100vh' }}>
        <header className="glass-blue" style={{
          padding: '40px 24px',
          color: 'white',
          borderRadius: '0 0 32px 32px',
          marginBottom: '20px',
          borderTop: 'none'
        }}>
          <button onClick={() => navigate('/roadmap')} style={{
            background: 'none', border: 'none', color: '#1E1B4B', fontWeight: '700',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px',
            fontSize: '0.9rem'
          }}>← Back to Timeline</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px'
            }}>🔬</div>
            <div>
              <h1 style={{ fontSize: '2.2rem', lineHeight: '1.1', fontWeight: '900', color: 'white' }}>Ph.D in Computer Science</h1>
              <p style={{ color: 'white', opacity: 0.9, fontSize: '0.9rem', marginTop: '4px' }}>Doctor of Philosophy - Research Excellence</p>
            </div>
          </div>
        </header>

        <div style={{ padding: '0 20px', marginTop: '-40px' }}>
          {/* Program Duration Section */}
          <div className="glass" style={{
            padding: '24px', borderRadius: '32px', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px',
            background: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E3A8A' }}>Program Duration</h3>
            <span style={{
              background: '#F59E0B', color: 'white', padding: '10px 24px',
              borderRadius: '16px', fontWeight: '900', fontSize: '1rem'
            }}>3-5 Years</span>
          </div>

          <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: '1.6', padding: '0 12px', marginBottom: '40px' }}>
            The duration varies based on research progress, thesis quality, and publication requirements. Full-time dedication required.
          </p>

          {/* Research Focus Section - Yellow Background */}
          <div style={{
            background: '#FEF3C7', borderRadius: '32px', padding: '32px 24px', marginBottom: '40px',
            border: '2px solid rgba(245, 158, 11, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: '#F59E0B',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem'
              }}>⚙️</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1E3A8A' }}>Research Focus</h3>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { step: "1", title: "Deep Research", text: "Conduct original research in a specialized computer science domain" },
                { step: "2", title: "Publish Papers", text: "Publish research papers in top-tier international conferences & journals" },
                { step: "3", title: "Thesis Work", text: "Write & defend comprehensive dissertation presenting original contributions" }
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex', gap: '20px', padding: '20px', background: 'white',
                  borderRadius: '24px'
                }}>
                  <div style={{
                    minWidth: '32px', height: '32px', borderRadius: '50%', background: '#F59E0B',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '900', fontSize: '0.9rem'
                  }}>{item.step}</div>
                  <div>
                    <h4 style={{ marginBottom: '4px', color: '#1E3A8A', fontWeight: '800' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.5' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Areas Section */}
          <div className="glass" style={{ padding: '32px 20px', borderRadius: '32px', marginBottom: '40px', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: '#6366F1',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem'
              }}>🔬</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1E3A8A' }}>Research Areas</h3>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { title: "Artificial Intelligence", desc: "Neural networks, deep learning, NLP, computer vision", color: "#EEF2FF", icon: "🤖" },
                { title: "Quantum Computing", desc: "Quantum algorithms, quantum cryptography, qubits", color: "#F5F3FF", icon: "⚛️" },
                { title: "Cyber Security", desc: "Cryptography, network security, blockchain security", color: "#FFFBEB", icon: "🛡️" },
                { title: "Data Mining", desc: "Big data analytics, pattern recognition, data science", color: "#EFF6FF", icon: "⛏️" },
                { title: "Distributed Systems", desc: "Cloud computing, edge computing, blockchain", color: "#ECFDF5", icon: "🌐" }
              ].map((area, idx) => (
                <div key={idx} style={{
                  padding: '20px', background: area.color, borderRadius: '24px',
                  display: 'flex', gap: '16px', alignItems: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{area.icon}</div>
                  <div>
                    <h4 style={{ color: '#1E3A8A', fontWeight: '800', marginBottom: '4px' }}>{area.title}</h4>
                    <p style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: '1.4' }}>{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Path - Navy Blue Container */}
          <div style={{
            background: '#1E1B4B', borderRadius: '40px', padding: '32px 20px', marginBottom: '40px', color: 'white',
            boxShadow: '0 20px 40px rgba(30, 27, 75, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingLeft: '12px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem'
              }}>🎓</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Career Path</h3>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { title: "Professor / Lecturer", desc: "Teaching & research at universities (IITs, NITs)", icon: "🎓", path: "/career-paths/research-assistant" },
                { title: "Research Scientist", desc: "Leading research teams in industrial R&D labs", icon: "🔬", path: "/career-paths/research-assistant" },
                { title: "AI Researcher", desc: "Research positions at Google, Microsoft, OpenAI, Meta", icon: "🤖", path: "/career-paths/software-developer" },
                { title: "Government Scientist", desc: "ISRO, DRDO, CSIR labs & national research centers", icon: "🏛️", path: "/career-paths/research-assistant" }
              ].map((job, idx) => (
                <div key={idx}
                  onClick={() => navigate(job.path)}
                  style={{
                    padding: '20px', background: 'white', borderRadius: '24px',
                    display: 'flex', gap: '16px', alignItems: 'center',
                    cursor: 'pointer', transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(8px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', background: '#6366F1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                    color: 'white'
                  }}>{job.icon}</div>
                  <div>
                    <h4 style={{ color: '#1E3A8A', fontWeight: '800', marginBottom: '4px', fontSize: '1rem' }}>{job.title}</h4>
                    <p style={{ fontSize: '0.7rem', color: '#64748B', lineHeight: '1.4' }}>{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#FEF3C7', border: '2px solid #FDE68A', padding: '24px', borderRadius: '24px', marginBottom: '40px' }}>
            <p style={{ fontSize: '0.9rem', color: '#92400E', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              💡 Ph.D Journey
            </p>
            <p style={{ fontSize: '0.75rem', color: '#B45309', lineHeight: '1.6', fontWeight: '500' }}>
              Ph.D is the highest academic degree. Ideal for those passionate about research, innovation, and extending the field of computer science through original contributions.
            </p>
          </div>
        </div>

        <button onClick={() => navigate('/roadmap/career')} style={{
          width: '100%', padding: '20px', background: '#10B981', color: 'white',
          borderRadius: '24px', fontWeight: '900', fontSize: '1.1rem', marginBottom: '40px',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
        }}>
          View Career Opportunities <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>
    );
  }

  if (stage?.toLowerCase() === 'career') {
    return (
      <div className="career-success" style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        <header className="glass-blue" style={{ padding: '30px 24px', borderRadius: '0 0 32px 32px', borderTop: 'none', color: 'white', marginBottom: '20px' }}>
          <button onClick={() => navigate(-1)} style={{
            background: 'none', border: 'none', color: 'white', fontWeight: '600',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', opacity: 0.8
          }}>← Back</button>
          <h1 style={{ fontSize: '1.8rem', color: 'white', fontWeight: '900' }}>Career Success</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>Job Opportunities</p>
        </header>

        <div style={{ padding: '20px' }}>
          {/* Tabs */}
          <div className="glass" style={{
            display: 'flex', padding: '6px', borderRadius: '16px', marginBottom: '32px',
            background: 'white', border: '1px solid #E2E8F0'
          }}>
            {["B.Tech", "B.Sc"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
                background: activeTab === tab ? '#6366F1' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s'
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
            {(activeTab === "B.Tech" ? [
              { title: "Software Developer", sub: "AI/ML Engineer", icon: "💻", color: "#4F46E5", path: "/career-paths/software-developer" },
              { title: "Web Developer", sub: "Full Stack Expert", icon: "🌐", color: "#8B5CF6", path: "/career-paths/web-developer" },
              { title: "Data Scientist", sub: "Big Data Analyst", icon: "📊", color: "#F59E0B", path: "/career-paths/data-scientist" },
              { title: "App Developer", sub: "Mobile & Cross-platform", icon: "📱", color: "#10B981", path: "/career-paths/app-developer" },
              { title: "DevOps Engineer", sub: "SRE & Automation", icon: "⚙️", color: "#F97316", path: "/career-paths/devops-engineer" },
              { title: "Cloud Engineer", sub: "AWS, Azure, GCP", icon: "☁️", color: "#06B6D4", path: "/career-paths/cloud-engineer" }
            ] : [
              { title: "Software Developer", sub: "Application Development", icon: "💻", color: "#4F46E5", path: "/career-paths/software-developer-bsc" },
              { title: "Web Developer", sub: "Frontend & Backend", icon: "🌐", color: "#8B5CF6", path: "/career-paths/web-developer-bsc" },
              { title: "Data Analyst", sub: "Business Intelligence", icon: "📊", color: "#F59E0B", path: "/career-paths/data-analyst" },
              { title: "System Analyst", sub: "IT Solutions", icon: "🖥️", color: "#10B981", path: "/career-paths/system-analyst" },
              { title: "IT Support Specialist", sub: "Technical Support", icon: "🔧", color: "#F97316", path: "/career-paths/it-support" },
              { title: "Research Assistant", sub: "Academic Research", icon: "🔬", color: "#A855F7", path: "/career-paths/research-assistant" }
            ]).map((job, idx) => (
              <div key={idx} className="glass"
                onClick={() => navigate(job.path)}
                style={{
                  padding: '16px 20px', borderRadius: '24px', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between', background: 'white',
                  cursor: 'pointer', transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%', background: job.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                    color: 'white', boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }}>{job.icon}</div>
                  <div>
                    <h4 style={{ color: '#1E1B4B', fontSize: '1rem', fontWeight: '700' }}>{job.title}</h4>
                    <p style={{ color: '#64748B', fontSize: '0.8rem' }}>{job.sub}</p>
                  </div>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>→</div>
              </div>
            ))}
          </div>

          {/* Growth Tips */}
          <div style={{ background: '#EEF2FF', padding: '32px', borderRadius: '32px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '12px', background: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>💼</div>
              <h3 style={{ color: '#1E3A8A', fontSize: '1.1rem', fontWeight: '800' }}>Career Growth Tips</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#1E3A8A', opacity: 0.8, lineHeight: '1.8' }}>
              {activeTab === "B.Tech"
                ? "B.Tech graduates have strong industry placements with higher starting salaries. Focus on building projects and participating in hackathons."
                : "B.Sc graduates excel in research and academics. Consider pursuing M.Sc or M.Tech for advanced career opportunities."
              }
            </p>
          </div>

          <button onClick={() => navigate('/roadmap')} style={{
            width: '100%', padding: '20px', background: '#10B981', color: 'white',
            borderRadius: '24px', fontWeight: '900', fontSize: '1.1rem', marginBottom: '40px',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            View Full Roadmap
          </button>
        </div>
      </div>
    );
  }

  // Fallback for other stages if they don't match the optimized ones
  return (
    <div className="detailed-roadmap" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '40px', padding: '30px', borderRadius: '24px', borderTop: 'none', color: 'white' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontWeight: '600', marginBottom: '12px', cursor: 'pointer', opacity: 0.8 }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '30px', color: 'white',
          }}>{stageData.icon}</div>
          <div>
            <h1 style={{ fontSize: '2rem' }}>{stageData.title}</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{stageData.subtitle}</p>
          </div>
        </div>
      </header>
      <div className="glass" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Details for this stage are coming soon!</p>
      </div>
    </div>
  );
};

export default DetailedRoadmap;
