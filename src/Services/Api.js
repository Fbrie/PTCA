import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Authentication APIs
 */
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

/**
 * Messaging APIs
 */
export const sendMessage = (messageData) => api.post('/messages', messageData);
export const fetchMessages = (userId) => api.get(`/messages/${userId}`);

/**
 * Progress Tracking APIs
 */
export const getStudentProgress = () => api.get('/progress');
export const addStudentProgress = (progressData) => api.post('/progress', progressData);

/**
 * Meeting Scheduling APIs
 */
export const scheduleMeeting = (meetingData) => api.post('/meetings', meetingData);
export const fetchMeetings = () => api.get('/meetings');

export default api;
