import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ChatBox from '../components/ChatBox';

const DashBoard = () => {
  return (
    <div className='h-screen flex flex-col'>
      <h1>DashBoard</h1>
      <div className='flex items-stretch justify-between h-[90%]'>
        <div className='w-[30%] border-2 rounded-md'>
          <div className='flex justify-between items-center p-2'>
            <h1>Chats</h1>
            <SearchBar />
          </div>
        </div>
        <div className='w-[70%] border-2 rounded-md p-4'>
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
