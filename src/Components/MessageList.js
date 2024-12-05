import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/messages/')
            .then(response => setMessages(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>{message.content} from {message.sender}</li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
