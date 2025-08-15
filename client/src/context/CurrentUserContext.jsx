import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CurrentUserDataContext = createContext()

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/CurrentUser`,{
        withCredentials: true
      })
      setUser(response.data)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  

  return (
    <CurrentUserDataContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserDataContext.Provider>
  )
}

export default CurrentUserProvider
