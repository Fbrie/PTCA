// src/pages/MessagesPage.js
import React, { useState, useEffect } from 'react';
import MessageList from '../Components/MessageList';
import { fetchMessages } from '../Services/api';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then(setMessages);
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <MessageList messages={messages} />
    </div>
  );
};

export default MessagesPage;
