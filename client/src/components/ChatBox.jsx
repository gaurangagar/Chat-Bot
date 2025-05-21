import React, { useState, useEffect,useContext } from 'react';
import io from 'socket.io-client';

import { CurrentUserDataContext } from '../context/CurrentUserContext';

const socket = io('http://localhost:8000');

function chatBox({userToChat}) {
  const {user, setUser}=useContext(CurrentUserDataContext)
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
  socket.connect();
    handleRegister();
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

useEffect(() => {
    setChat([])
  
  }, [userToChat])


  const handleRegister = () => {
    if (user?.userName) {
      socket.emit('register', user.userName);
      console.log('Registering user:', user.userName);
    }else {
    console.log('Please enter your User ID to register');
  }
  };

  const sendMessage = () => {
    socket.emit('private-message', {
      to: userToChat.userName,
      from: user.userName,
      message,
    });
    setChat((prev) => [...prev, `To ${userToChat.userName}: ${message}`]);
    setMessage('');
  };

  return (
    <div className='p-5'>
      <h2>Private Chat</h2>

      <div className='mt-2.5'>
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div className='mt-5'>
        <div className='flex'>
          <h4>Chat Log: </h4>
          <h4>You are chatting to {userToChat.userName}</h4>
        </div>
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default chatBox;
