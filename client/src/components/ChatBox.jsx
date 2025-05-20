import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function chatBox() {
  const [userId, setUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
  socket.connect();

  const handlePrivateMessage = ({ from, message }) => {
    setChat((prev) => [...prev, `From ${from}: ${message}`]);
  };

  socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
  });

  socket.on('private-message', handlePrivateMessage);

  return () => {
    socket.off('private-message', handlePrivateMessage); // REMOVE listener on cleanup
    socket.disconnect();
  };
}, []);


  const handleRegister = () => {
    if (userId) {
      socket.emit('register', userId);
      console.log('Registering user:', userId);
    }else {
    console.log('Please enter your User ID to register');
  }
  };

  const sendMessage = () => {
    socket.emit('private-message', {
      to: recipientId,
      from: userId,
      message,
    });
    setChat((prev) => [...prev, `To ${recipientId}: ${message}`]);
    setMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Private Chat</h2>

      <div>
        <input
          placeholder="Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Chat Log</h4>
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default chatBox;
