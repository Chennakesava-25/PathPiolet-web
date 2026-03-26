import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

export const userService = {
  getProfile: (userId) => api.get(`/auth/profile/${userId}`),
  updateProfile: (userId, data) => api.put(`/auth/profile/${userId}`, data),
  uploadProfilePhoto: (userId, formData) => api.post(`/auth/profile/${userId}/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  removeProfilePhoto: (userId) => api.delete(`/auth/profile/${userId}/photo`),
  getActivityHistory: (userId) => api.get(`/activity/${userId}`),
  deleteActivityHistory: (itemId, userId) => api.delete(`/activity/${itemId}?user_id=${userId}`),
};

export const contentService = {
  getColleges: () => api.get('/colleges'),
  getCareers: () => api.get('/careers'),
  getRoadmap: () => api.get('/roadmap'),
  getRecommendations: (prefs) => api.post('/recommendations', prefs),
  getAiRecommendations: (prefs) => api.post('/ai_finder', prefs),
  saveCollege: (data) => api.post('/colleges/save', data),
  unsaveCollege: (userId, collegeId) => api.delete(`/colleges/save/${userId}/${collegeId}`),
  getSavedColleges: (userId) => api.get(`/colleges/saved/${userId}`),
  saveRoadmap: (data) => api.post('/roadmap/save', data),
};

export const communityService = {
  sendFeedback: (data) => api.post('/feedback', data),
  sendRating: (data) => api.post('/rate', data),
  contactUs: (data) => api.post('/contact', data),
  getQna: (userId) => api.get(`/qna/${userId}`),
  askQuestion: (data) => api.post('/qna', data),
};

export const calendarService = {
  getEvents: (userId) => api.get(`/events/${userId}`),
  addEvent: (data) => api.post('/events', data),
  deleteEvent: (eventId) => api.delete(`/events/${eventId}`),
};

export default api;
