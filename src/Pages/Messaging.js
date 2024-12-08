// src/pages/Messaging.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('/api/messages/'); // Replace with your Django messages API endpoint
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const response = await axios.post('/api/messages/', { text: newMessage }); // Adjust endpoint
      setMessages([...messages, response.data]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Messaging</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Messaging;
