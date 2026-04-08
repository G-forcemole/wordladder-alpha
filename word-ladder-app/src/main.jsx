import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Word Ladder Game</h1>
    <App />
    <h1>Word bank</h1>
  </StrictMode>,
)
