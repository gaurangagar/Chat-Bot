import React, { useContext } from 'react'
import { CurrentUserDataContext } from '../context/CurrentUserContext';
import { io } from "socket.io-client";

const ChatBox = () => {

    const context = useContext(CurrentUserDataContext);
    const { currentUser, setcurrentUser } = context;

  return (
    <>
      {!currentUser || Object.keys(currentUser).length === 0 ? (
        <div>ChatBox</div>
      ) : (
        <div>You are chatting with {currentUser.fullName.firstName}</div>
      )}
    </>
  )
}

export default ChatBox