import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { communityService } from '../services/apiService';

const Contact = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{"id": 1}');
  const [formData, setFormData] = useState({
    name: user.username || '',
    email: user.email || '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setIsSubmitting(true);
    try {
      await communityService.contactUs({
        user_id: user.id,
        subject: formData.subject,
        message: `Name: ${formData.name}\n\n${formData.message}`,
        sender_email: formData.email
      });
      setShowSuccess(true);
    } catch (err) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(formData).every(val => val.trim().length > 0);

  return (
    <div className="contact-container">
      <header className="contact-header glass-blue" style={{ padding: '30px', borderRadius: '24px', marginBottom: '40px', borderTop: 'none', color: 'white' }}>
        <div className="back-button-circle" onClick={() => navigate(-1)} style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}>
          <span>←</span>
        </div>
        <h1 className="contact-title" style={{ color: 'white' }}>Contact Us</h1>
      </header>

      <section className="contact-section">
        <h2 className="contact-section-title">Support Options</h2>

        <div className="support-card">
          <div className="support-icon-box email-icon-bg">
            <span style={{ fontSize: '1.2rem', color: '#4F46E5' }}>✉️</span>
          </div>
          <div>
            <h3 className="support-card-title">Email Support</h3>
            <p className="support-card-details" style={{ color: '#4F46E5' }}>pathpiolet@gmail.com</p>
          </div>
        </div>

        <div className="support-card">
          <div className="support-icon-box call-icon-bg">
            <span style={{ fontSize: '1.2rem', color: '#2563EB' }}>📞</span>
          </div>
          <div>
            <h3 className="support-card-title">Call Support</h3>
            <p className="support-card-details" style={{ color: '#2563EB' }}>+91-9876543210</p>
          </div>
        </div>


      </section>

      <section className="contact-section">
        <h2 className="contact-section-title">Send us a Message</h2>

        <form onSubmit={handleSubmit} className="contact-form-card">
          <div className="contact-field-group">
            <label className="contact-field-label">Name</label>
            <input
              type="text"
              className="contact-input-field"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="contact-field-group">
            <label className="contact-field-label">Email</label>
            <input
              type="email"
              className="contact-input-field"
              placeholder="your@email.com"
              value={formData.email}
              readOnly
              style={{ background: '#F1F5F9', cursor: 'not-allowed', color: '#64748B' }}
            />
          </div>

          <div className="contact-field-group">
            <label className="contact-field-label">Subject</label>
            <input
              type="text"
              className="contact-input-field"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="contact-field-group">
            <label className="contact-field-label">Message</label>
            <textarea
              className="contact-input-field"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value.substring(0, 500) })}
              style={{ minHeight: '120px', resize: 'none' }}
            />
            <p className="char-counter">{formData.message.length}/500 characters</p>
          </div>

          <button
            className="submit-contact-btn"
            type="submit"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </section>

      <div className="response-time-card">
        <h3 className="response-time-title">Response Time</h3>
        <p className="response-time-text">
          We typically respond to all inquiries within 24-48 hours during business days.
          For urgent matters, please use our call support option.
        </p>
      </div>

      {showSuccess && (
        <div className="success-overlay-backdrop">
          <div className="success-thanks-card">
            <div className="success-check-circle">
              <span>✓</span>
            </div>
            <h2 className="success-main-title">Message Sent!</h2>
            <p className="success-sub-text">
              Your message has been sent successfully. We'll get back to you soon!
            </p>
            <button
              className="submit-contact-btn"
              onClick={() => {
                setShowSuccess(false);
                navigate('/profile');
              }}
              style={{ padding: '14px', fontSize: '1rem' }}
            >
              Back to Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
