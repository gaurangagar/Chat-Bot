import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>ChatBot</h1>
        <p>Online Chatting App</p>
        <Link to='/signin'>Login</Link>
        <Link to='/signup'>Register</Link>
    </div>
  )
}

export default Home