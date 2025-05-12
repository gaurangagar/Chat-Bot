import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import DashBoard from './pages/DashBoard'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
    
  )
}

export default App