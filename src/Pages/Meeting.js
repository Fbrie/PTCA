// src/pages/Meeting.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Meeting = () => {
  const [meetingForm, setMeetingForm] = useState({ title: '', date: '' });
  const [meetings, setMeetings] = useState([]);

  const handleChange = (e) => {
    setMeetingForm({ ...meetingForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/meetings/', meetingForm); // Replace with your Django meetings API endpoint
    setMeetings([...meetings, response.data]);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      const response = await axios.get('/api/meetings/');
      setMeetings(response.data);
    };
    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Meeting Scheduler</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={meetingForm.title} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={meetingForm.date} onChange={handleChange} />
        </label>
        <button type="submit">Schedule Meeting</button>
      </form>
      <h3>Upcoming Meetings</h3>
      <ul>
        {meetings.map((meeting, index) => (
          <li key={index}>
            {meeting.title} - {meeting.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meeting;
