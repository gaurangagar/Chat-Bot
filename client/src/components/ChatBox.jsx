import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

import { CurrentUserDataContext } from '../context/CurrentUserContext';

const socket = io('http://localhost:8000');

function chatBox({ userToChat }) {
  const { user, setUser } = useContext(CurrentUserDataContext);
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.connect();
    handleRegister();
    const handlePrivateMessage = ({ from, message }) => {
      setChat((prev) => [
    ...prev,
    {
      from: userToChat.userName,
      to: user.userName,
      message,
      timestamp: new Date().toISOString(),
    },
  ]);
    };

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });

    socket.on('private-message', handlePrivateMessage);

    return () => {
      socket.off('private-message', handlePrivateMessage);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setChat([]);
  }, [userToChat]);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/message/getMessages`, {
        from: user.userName,
        to: userToChat?.userName,
      })
      .then((response) => {
        setChat(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log('Error fetching messages:', error);
      });
  }, [userToChat]);

  const handleRegister = () => {
    if (user?.userName) {
      socket.emit('register', user.userName);
      console.log('Registering user:', user.userName);
    } else {
      console.log('Please enter your User ID to register');
    }
  };

  const sendMessage = () => {
    if(!message) return;
    socket.emit('private-message', {
      to: userToChat.userName,
      from: user.userName,
      message,
    });
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/message/createMessage`, {
        from: user.userName,
        to: userToChat?.userName,
        message: message,
      })
      .then((response) => {
        console.log('message created in database');
      })
      .catch((error) => {
        console.log('message not created in database', error);
      });
    setChat((prev) =>[
    ...prev,
    {
      from: user.userName,
      to: userToChat.userName,
      message,
      timestamp: new Date().toISOString(),
    },
  ]);
    setMessage('');
  };

  return (
    <div className='p-4 max-w-full mx-auto flex flex-col h-[80vh] min-h-[400px] border rounded shadow-md'>
      <h2>Private Chat</h2>
      <div className='mt-2.5'>
        <input
          placeholder="Type your message"
          className="flex-grow resize-none border rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 text-sm rounded-r-lg hover:bg-blue-600 transition-colors"
        >Send</button>
      </div>

      <div className='mt-5'>
        <div className='flex'>
          <h4>Chat Log: </h4>
          <h4>You are chatting to {userToChat?.userName}</h4>
        </div>
        <div className="flex-grow overflow-y-auto bg-gray-50 p-3 space-y-2 rounded border" style={{ maxHeight: '50vh' }}>
          {chat.map((msg, index) => (
            <div 
            key={index}
          className={`p-2 rounded text-sm ${
          index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
        }`}>
    <strong>{msg.from === user?.userName ? 'You' : msg.from}:</strong> {msg.message}
  </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default chatBox;
