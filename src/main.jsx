import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './helper/AlertProvider.jsx';
import { AuthProvider } from './helper/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AlertProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AlertProvider>
  </BrowserRouter>
)
