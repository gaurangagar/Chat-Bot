import socket from "./socket";
import axios from "axios";

export const sendMessage = async({message, user,userToChat,setChat,setMessage}) => {
    if (!message.trim()) return;
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
      }).catch(() => {});
    setChat((prev) => [
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