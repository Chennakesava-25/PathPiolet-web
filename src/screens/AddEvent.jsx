import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { calendarService } from "../services/apiService";

const AddEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDate = location.state?.date
    ? new Date(location.state.date)
    : new Date();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    event_date: initialDate.toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Please enter an event title");

    // --- Validate Future Date & Time ---
    const now = new Date();
    // Start with the selected date (at midnight local time)
    const [year, month, day] = formData.event_date.split('-');
    const selectedDateTime = new Date(year, month - 1, day);

    // If user provided a time, add it to the selected date
    if (formData.time) {
      const [hours, minutes] = formData.time.split(':');
      selectedDateTime.setHours(hours, minutes, 0, 0);
    } else {
      // If no time is provided, assume end of the selected day (23:59:59) for past-date checks
      selectedDateTime.setHours(23, 59, 59, 999);
    }

    if (selectedDateTime < now) {
      return alert("You cannot schedule events in the past. Please choose a future date or time.");
    }
    // ------------------------------------

    setIsSubmitting(true);
    try {
      await calendarService.addEvent({
        ...formData,
        user_id: user.id,
      });
      // Show instant success overlay before navigating back
      navigate("/calendar");
    } catch (err) {
      alert("Failed to save event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        padding: "0px",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#F8FAFC",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Blue Header */}
      <header
        style={{
          background: "#1C3E8A",
          padding: "30px 20px 40px",
          color: "white",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontWeight: "500",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <span>←</span> Back
        </button>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            marginBottom: "8px",
            fontFamily: "var(--font-title)",
          }}
        >
          Add Event
        </h1>
        <p style={{ opacity: 0.9, fontSize: "0.9rem" }}>
          Schedule new exams & deadlines
        </p>

        <div
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-20%)",
            width: "64px",
            height: "64px",
            background: "white",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#1C3E8A",
            fontWeight: "800",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          }}
        >
          <span
            style={{ fontSize: "0.7rem", opacity: 0.7, marginBottom: "-4px" }}
          >
            Date
          </span>
          <span style={{ fontSize: "1.4rem" }}>{initialDate.getDate()}</span>
        </div>
      </header>

      {/* Main Form Content */}
      <div style={{ padding: "24px", flex: 1, marginTop: "-20px" }}>
        <form
          onSubmit={handleSubmit}
          className="glass"
          style={{
            background: "white",
            padding: "32px 24px",
            borderRadius: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Event Title */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "700",
                color: "#1E293B",
                marginBottom: "8px",
              }}
            >
              Event Name *
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.5,
                }}
              >
                📝
              </span>
              <input
                type="text"
                placeholder="e.g. JEE Main 2026"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 44px",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  background: "#F8FAFC",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-main)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1C3E8A";
                  e.target.style.background = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E2E8F0";
                  e.target.style.background = "#F8FAFC";
                }}
              />
            </div>
          </div>

          {/* Event Date */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "700",
                color: "#1E293B",
                marginBottom: "8px",
              }}
            >
              Date *
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.5,
                }}
              >
                📅
              </span>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) =>
                  setFormData({ ...formData, event_date: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 44px",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  background: "#F8FAFC",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-main)",
                  color: "#1E293B",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1C3E8A";
                  e.target.style.background = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E2E8F0";
                  e.target.style.background = "#F8FAFC";
                }}
              />
            </div>
          </div>

          {/* Event Time */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "700",
                color: "#1E293B",
                marginBottom: "8px",
              }}
            >
              Time
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.5,
                }}
              >
                🕒
              </span>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 44px",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  background: "#F8FAFC",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-main)",
                  color: "#1E293B",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1C3E8A";
                  e.target.style.background = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E2E8F0";
                  e.target.style.background = "#F8FAFC";
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "700",
                color: "#1E293B",
                marginBottom: "8px",
              }}
            >
              Notes
            </label>
            <div style={{ position: "relative" }}>
              <textarea
                placeholder="Additional details..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "16px",
                  minHeight: "100px",
                  resize: "none",
                  border: "1px solid #E2E8F0",
                  background: "#F8FAFC",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-main)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1C3E8A";
                  e.target.style.background = "white";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E2E8F0";
                  e.target.style.background = "#F8FAFC";
                }}
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.title}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "16px",
              background: "#FBBF24",
              color: "black",
              fontWeight: "800",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              opacity: isSubmitting || !formData.title ? 0.7 : 1,
              transition: "all 0.2s",
              boxShadow: "0 4px 14px rgba(251, 191, 36, 0.4)",
            }}
          >
            {isSubmitting ? "Saving..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
