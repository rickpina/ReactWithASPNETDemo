import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PersonGrid from './PersonGrid.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <PersonGrid />
  </StrictMode>,
)
