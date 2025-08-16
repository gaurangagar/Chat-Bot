import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import socket from '../utils/socket'
import ChatInput from './ChatInput';
import { sendMessage } from '../utils/sendMessage';
import { CurrentUserDataContext } from '../context/CurrentUserContext';

function ChatBox({ userToChat }) {

  const { user, setUser } = useContext(CurrentUserDataContext);

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);
  const [isTyping, setisTyping] = useState(false)
  const typingTimeoutRef = useRef(null);

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

  const handleTyping=({from})=>{
    if(from===userToChat.userName) {
      setisTyping(true)
      if(typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        setisTyping(false);
      }, 2000);
    }
  }

  useEffect(() => {
    socket.connect();
    handleRegister();
    
    socket.on('typing',handleTyping)

    socket.on('private-message', handlePrivateMessage);

    return () => {
      socket.off('private-message', handlePrivateMessage);
      socket.off('typing',handleTyping)
      socket.disconnect();
    };
  }, [userToChat]);

  useEffect(() => {
    setChat([]);
  }, [userToChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/message/getMessages`, {
        from: user.userName,
        to: userToChat?.userName,
      })
      .then((response) => {
        setChat(response.data);
      })
      .catch(() => null);
  }, [userToChat]);

  const handleRegister = () => {
    if (user?.userName) {
      socket.emit('register', user.userName);
    }
  };

  const handleSendMessage = () => {
    sendMessage({ message, user, userToChat, setChat, setMessage });
  };

  return (
    <div className='p-2 max-w-full mx-auto flex flex-col h-[80vh] min-h-[400px] border rounded shadow-md'>
      <div className='mt-5'>
        <div className='flex'>
          <h4>Chat Log : </h4>
          <h4>You are chatting to {userToChat?.userName}</h4>
        </div>
        {userToChat.isOnline ? (
          <p>{userToChat.userName} is online </p>
        ) : (
          <p>Last Seen : {userToChat.lastSeen}.</p>
        )}
        {isTyping && <p >{userToChat.userName} is typing...</p>}
        {chat.length > 0 && (
          <div
            className="flex-grow overflow-y-auto bg-gray-50 p-3 space-y-2 rounded border"
            style={{ maxHeight: '45vh' }}
            ref={chatContainerRef}
          >
            {chat.map((msg, index) => 
              <div
                key={index}
                className={`p-2 rounded text-sm 
                  ${msg.from === user?.userName ? 'text-right' : 'text-left'} 
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                `}
              >
              <strong>{msg.from === user?.userName ? 'You' : msg.from}:</strong> {msg.message}
              </div>
            )}
          </div>
        )}
      </div>

      
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={handleSendMessage}
        onTyping={() => socket.emit('typing', { from: user.userName, to: userToChat.userName })}
      />
      
    </div>
  );
}

export default ChatBox;
