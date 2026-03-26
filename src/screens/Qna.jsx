import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { communityService } from '../services/apiService';

const Qna = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [isAsking, setIsAsking] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '', tag: 'General' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{"id": 1}');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await communityService.getQna(user.id);
      setQuestions(data);
    } catch (err) {
      console.error('Failed to load Q&A:', err);
    }
  };

  const handleAsk = async () => {
    if (!newQuestion.title || !newQuestion.description) return;
    setIsSubmitting(true);
    try {
      await communityService.askQuestion({
        user_id: user.id,
        title: newQuestion.title,
        description: newQuestion.description,
        tag: newQuestion.tag
      });
      setIsAsking(false);
      setNewQuestion({ title: '', description: '', tag: 'General' });
      fetchQuestions(); // Refresh list
    } catch (err) {
      alert("Failed to post question. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="qna-page" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Q&A Community</h1>
          <p style={{ color: 'var(--text-muted)' }}>Ask questions and get expert career advice</p>
        </div>
        <button
          className="btn-primary"
          style={{ padding: '12px 24px' }}
          onClick={() => setIsAsking(!isAsking)}
        >
          {isAsking ? 'Cancel' : 'Ask Question +'}
        </button>
      </header>

      {isAsking && (
        <div className="glass" style={{ padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>New Question</h3>
          <input
            type="text"
            placeholder="Question Title (e.g. Which specialization is best?)"
            className="input-field"
            style={{ marginBottom: '16px' }}
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
          />
          <textarea
            placeholder="Describe your question in detail..."
            className="input-field"
            style={{ marginBottom: '16px', minHeight: '100px', resize: 'none' }}
            value={newQuestion.description}
            onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
          />
          <select
            className="input-field"
            style={{ marginBottom: '16px' }}
            value={newQuestion.tag}
            onChange={(e) => setNewQuestion({ ...newQuestion, tag: e.target.value })}
          >
            <option value="General">General</option>
            <option value="Career Guidance">Career Guidance</option>
            <option value="Admission">Admission</option>
            <option value="College Search">College Search</option>
          </select>
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '12px' }}
            onClick={handleAsk}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Question'}
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {questions.length === 0 && !isAsking ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>You haven't asked any questions yet.</p>
        ) : (
          questions.map((q, idx) => (
            <div key={idx} className="glass" style={{ padding: '24px', borderRadius: '24px', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: 'var(--primary)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}>{q.tag}</span>
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: '600' }}>● {q.status}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{q.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>{q.description}</p>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                Posted on {q.created_at}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Qna;
