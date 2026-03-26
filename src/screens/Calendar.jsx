import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calendarService } from '../services/apiService';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    if (!user.id) return;
    setIsLoading(true);
    try {
      const response = await calendarService.getEvents(user.id);
      setEvents(response.data);
    } catch (err) {
      console.error('Failed to fetch events', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await calendarService.deleteEvent(eventId);
      fetchEvents();
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderHeader = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
      <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--primary)', fontWeight: '700' }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="btn-primary" style={{ padding: '8px 16px' }}>‹</button>
          <button onClick={() => setCurrentDate(new Date())} className="btn-primary" style={{ padding: '8px 16px' }}>Today</button>
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="btn-primary" style={{ padding: '8px 16px' }}>›</button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startOffset = firstDayOfMonth(year, month);

    // Padding for start
    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Actual days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const hasEvent = events.some(e => e.event_date === dateStr);
      const isSelected = selectedDate.getDate() === d && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

      days.push(
        <div
          key={d}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
          onClick={() => setSelectedDate(new Date(year, month, d))}
          style={{
            position: 'relative',
            cursor: 'pointer',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '12px',
            transition: 'all 0.2s',
            background: isSelected ? 'var(--primary)' : 'white',
            color: isSelected ? 'white' : 'var(--text-main)',
            border: '1px solid var(--border)'
          }}
        >
          {d}
          {hasEvent && !isSelected && <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></div>}
        </div>
      );
    }

    return <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>{days}</div>;
  };

  const upcomingEvents = events
    .filter(e => new Date(e.event_date) >= new Date().setHours(0, 0, 0, 0))
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

  return (
    <div className="calendar-page" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="glass-blue" style={{ marginBottom: '40px', padding: '30px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 'none', color: 'white' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-title)' }}>Calendar</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Track exams and important deadlines</p>
        </div>
        <button
          onClick={() => navigate('/calendar/add', { state: { date: selectedDate.toISOString() } })}
          style={{
            width: '48px', height: '48px', borderRadius: '50%', background: '#FBBF24',
            color: 'white', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)', transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          +
        </button>
      </header>

      <div className="calendar-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        <section className="glass" style={{ padding: '32px', borderRadius: '32px' }}>
          {renderHeader()}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '12px', textAlign: 'center', fontWeight: 'bold', color: 'var(--text-muted)' }}>
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          {renderDays()}
        </section>

        <section className="events-panel">
          <h3 style={{ marginBottom: '24px', color: 'var(--primary)' }}>Upcoming Events</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {isLoading ? <p>Loading events...</p> :
              upcomingEvents.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No upcoming events.</p> :
                upcomingEvents.map(event => (
                  <div key={event.id} className="glass" style={{ padding: '20px', borderRadius: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ fontWeight: '700' }}>{event.title}</h4>
                      <button onClick={() => handleDeleteEvent(event.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>🗑️</button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{event.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: '600' }}>📅 {event.event_date}</span>
                      {event.time && <span style={{ color: 'var(--text-muted)' }}>🕒 {event.time}</span>}
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>

      <style>{`
        .calendar-day:hover { transform: scale(1.05); filter: brightness(0.95); }
        .calendar-day.selected:hover { filter: brightness(1.1); }
      `}</style>
    </div>
  );
};

export default Calendar;
