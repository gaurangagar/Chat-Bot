import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUserDataContext } from '../context/CurrentUserContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(CurrentUserDataContext);

  useEffect(() => {
    if (user) {
      return navigate('/dashboard');
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-2">ChatBot</h1>
      <p className="text-gray-600 mb-6">Online Chatting App</p>
      <p>
        Already have an account?{' '}
        <Link to="/signin" className="text-blue-600 underline">
          Login
        </Link>.
      </p>
      <p>
        New here?{' '}
        <Link to="/signup" className="text-blue-600 underline">
          Register
        </Link>{' '}
        to start chatting!
      </p>
    </div>
  );
};

export default Home;
