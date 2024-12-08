// src/services/api.js
import axios from 'axios';

export const fetchMessages = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/messages/');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};
