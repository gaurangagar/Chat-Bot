import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CurrentUserDataContext } from '../context/CurrentUserContext';

const SearchBar = ({setuserToChat}) => {
  const [allUsers, setallUsers] = useState([]);
  const {user, setUser}=useContext(CurrentUserDataContext)
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/allusers`)
      .then((response) => {
        setallUsers(response.data);
      })
      .catch((error) => {
        console.log('Error fetching users:', error);
      });
  }, []);

  const [searchText, setSearchText] = useState('');
  const filteredUsers = allUsers?.filter(u =>
    user?.userName!=u.userName &&
    u.fullName.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSetCurrentUser = (user) => {
    setuserToChat(user)
    setSelectedUser(user._id);
    console.log('user to chat set to:', user);
  };

  return (
    <div className='w-full'>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <ul className="mt-2 space-y-1 max-h-60 overflow-y-auto text-sm">
        {!filteredUsers || filteredUsers.length === 0 ? (
          <li>No users found.</li>
        ) : (
          filteredUsers.map((user, index) => (
            <li key={index}>
              <button
                onClick={() => handleSetCurrentUser(user)}
                className={`w-full text-left px-2 py-1 rounded transition 
                  ${selectedUser === user._id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >{user.fullName.firstName}</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
