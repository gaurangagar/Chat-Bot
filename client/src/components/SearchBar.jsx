import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CurrentUserDataContext } from '../context/CurrentUserContext';

const SearchBar = ({setuserToChat}) => {
  const [allUsers, setallUsers] = useState([]);
  const {user, setUser}=useContext(CurrentUserDataContext)
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
    console.log('user to chat set to:', user);
  };

  return (
    <div>
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
      <ul>
        {!filteredUsers || filteredUsers.length === 0 ? (
          <li>No users found.</li>
        ) : (
          filteredUsers.map((user, index) => (
            <li key={index}>
              <button
                onClick={() => handleSetCurrentUser(user)}
              >{user.fullName.firstName}</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
