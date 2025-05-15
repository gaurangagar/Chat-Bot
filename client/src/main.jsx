import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CurrentUserProvider from './context/CurrentUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentUserProvider>
  </StrictMode>,
)
