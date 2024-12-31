import React, { useState } from 'react';
import { scheduleMeeting } from '../services/api';

const ScheduleMeeting = () => {
  const [meeting, setMeeting] = useState({ teacher_id: '', parent_id: '', date: '', description: '' });

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await scheduleMeeting(meeting);
      console.log('Meeting scheduled:', response.data);
    } catch (error) {
      console.error('Meeting error:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Schedule a Meeting</h2>
      <input type="text" name="teacher_id" placeholder="Teacher ID" onChange={handleChange} />
      <input type="text" name="parent_id" placeholder="Parent ID" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      <textarea name="description" placeholder="Meeting Description" onChange={handleChange}></textarea>
      <button type="submit">Schedule</button>
    </form>
  );
};

export default ScheduleMeeting;
