import { useContext,useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'

import SearchBar from '../components/SearchBar';
import ChatBox from '../components/ChatBox';
import { CurrentUserDataContext } from '../context/CurrentUserContext';
import axios from 'axios';

const DashBoard = () => {
  const navigate = useNavigate();
  const {user, setUser}=useContext(CurrentUserDataContext)
  const [userToChat, setuserToChat] = useState({})

  useEffect(() => {
    if (!user) {
      return navigate('/signin');
    }
  }, [user]);

  const LogoutHandler = (e) => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/logout`)
      .then((response) => {
        setUser(null);
        console.log('logged out', response.data);
      })
      .catch((error) => {
        console.log('Error logging out', error);
      });
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex items-end justify-between'>
        <h1>DashBoard</h1>
        <button
          onClick={LogoutHandler}
        >Log Out</button>
      </div>
      <div className='flex items-stretch justify-between h-[90%]'>
        <div className='w-[30%] border-2 rounded-md'>
          <div className='flex justify-between items-center p-2'>
            <h1>Chats</h1>
            <SearchBar setuserToChat={setuserToChat} />
          </div>
        </div>
        <div className='w-[70%] border-2 rounded-md p-4'>
          {userToChat && Object.keys(userToChat).length > 0 ? (
            <ChatBox userToChat={userToChat} />
          ) : (
            <div>choose person to chat</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
