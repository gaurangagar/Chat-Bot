import React, { createContext, useEffect, useState } from 'react'

export const CurrentUserDataContext=createContext()

const CurrentUserProvider = ({children}) => {

    const [currentUser, setcurrentUser] = useState({})

    useEffect(() => {
      
      const user=localStorage.getItem('user')
      if(user) setcurrentUser(JSON.parse(user))
    }, [])
    
  return (
    <CurrentUserDataContext.Provider value={{ currentUser, setcurrentUser }}>
      {children}
    </CurrentUserDataContext.Provider>
  )
}

export default CurrentUserProvider