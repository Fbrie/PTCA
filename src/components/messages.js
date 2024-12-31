import React, { useState } from 'react';
import { sendMessage } from '../services/api';

const Messaging = () => {
  const [message, setMessage] = useState({ sender_id: '', receiver_id: '', content: '' });

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    try {
      const response = await sendMessage(message);
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Message error:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Send a Message</h2>
      <input type="text" name="sender_id" placeholder="Sender ID" onChange={handleChange} />
      <input type="text" name="receiver_id" placeholder="Receiver ID" onChange={handleChange} />
      <textarea name="content" placeholder="Message Content" onChange={handleChange}></textarea>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Messaging;
