// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'  // ← должно быть так!
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* ← Здесь должен быть App, не RegistrationPage */}
  </React.StrictMode>,
)